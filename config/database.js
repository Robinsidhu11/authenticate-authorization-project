const mongoose=require('mongoose')

const dbconnectFN=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("db connected sucessfully")).catch((err)=>console.log("db not connected"))
}
module.exports=dbconnectFN