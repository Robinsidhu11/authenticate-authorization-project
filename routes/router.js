const express=require('express')
const routers=express.Router()
const signupfn=require('../controllers/signup')
const loginfn=require('../controllers/login')
routers.post("/create",signupfn)
routers.post("/login",loginfn)
const [auth,isStudent,isAdmin]=require('../middlewares/authenticate&authorize')
routers.get("/test", auth, (req,res) =>{
    res.send("Welcome to the Protected route for just authenticated user")
});
routers.get("/student",auth,isStudent,(req,res)=>{
    res.send("this is page only for students to access and you are")
})
routers.get("/admin",auth,isAdmin,(req,res)=>{
    res.send("this is page only for admin to access and you are")
})
module.exports=routers