const jwt=require('jsonwebtoken')
require('dotenv').config()
const authenticate= async (req,res,next)=>{
    try{
        // fetch token there are 3 ways to do so. using body, cookie or headers

        // using body( we need to pass token in request body)
        // const token=req.body.token

        // using cookie
        // const token=req.cookies.token

        // using headers
        // const token=req.header("Authorization").replace("Bearer ","")

        // use this for general case
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        if(!token || token ===undefined){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
        }

        // decode token and get payload by passing secretkey
        const payload=await jwt.verify(token,process.env.SECRET_KEY)
        console.log(payload)

        // sending the payload inside the req so that next middlewares can access that updated request
        // console.log(payload)
        req.user=payload
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
const isStudent=async (req,res,next)=>{
    try{
        if(req.user.role!=="student"){
            return res.status(401).json({
                success:true,
                message:"you are not student so not authorize to see this page"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
    // const role=req.body.user.role
}
const isAdmin=async (req,res,next)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(401).json({
                success:true,
                message:"you are not admin so not authorize to see this page"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
    // const role=req.body.user.role
}
module.exports=[authenticate,isStudent,isAdmin]