const usermodel=require('../model/user')
const bcrypt=require('bcrypt')
const signup=async (req,res)=>{
    try{
        const {email,name,password,role}=req.body
        // chek if email already registered
        if(! email.includes("@")){
            return res.status(401).json({
                success:false,
                message:"enter valid email"
            })
        }
        const answer=await usermodel.findOne({email:email})
        // console.log(answer)
        if(answer){
            return res.status(401).json({
                success:false,
                message:"user already registered. go to login page"
            })
        }
        // hashpassword using bcrypt

        const hashedpassword=await bcrypt.hash(password,10)
        const obj=new usermodel({
            name,
            email,
            password:hashedpassword,
            role
        })
        // add to db
        const response=await obj.save()
        res.status(200).json({
            success:true,
            message:"user added in db sucessfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:true,
            error_message:err.message
        })
    }
}

module.exports=signup