const jwt=require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.auth;

    if(token){
        const decode=jwt.verify(token,process.env.key)

        if(decode){
            const userId=decode.userId
            console.log("decoded here",decode)
            req.body.userId=userId
            next()
        }
        else{
            res.send("please login")
        }
    }
    else{
        res.send("please login")
    }
}


module.exports={auth}