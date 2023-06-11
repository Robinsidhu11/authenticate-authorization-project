const usermodel=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const login=async (req,res)=>{
    try{
        const {email,password}=req.body
        // chek if email already registered
        if(! email.includes("@")){
            return res.status(401).json({
                success:false,
                message:"enter valid email"
            })
        }
        let answer=await usermodel.findOne({email:email})
        // console.log(answer)
        if(! answer){
            return res.status(401).json({
                success:false,
                message:"user not registered. go to signup page"
            })
        }
        // verify password
        if(! await bcrypt.compare(password,answer.password)){
             return res.status(401).json({
                success:false,
                message:"you entered in correct password"
            })
        }
        // create token
        const payload={
            email:answer.email,
            id:answer._id,
            role:answer.role

        }
        const token=await jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:"2h"
        })

        // line 1 not working without this
        answer=answer.toObject()

        // line 1
        answer.token=token
        answer.password=undefined
        // console.log(answer)
        const options = {
            expires: new Date( Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        return res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            answer,
            message:"user logged in successfully"
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    }
    catch(err){
        res.status(500).json({
            success:true,
            error_message:err.message
        })
    }
}

module.exports=login