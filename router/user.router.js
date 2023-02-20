const express=require("express")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()
require("dotenv").config()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body
    try{
        bcrypt.hash(password, 5, async(err,secure_password) =>{
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({email,password:secure_password,name,age,gender,city})
                await user.save()
                res.send("User Registered")
            }
        });
        
    }
    catch(err){
        res.send({"msg":"something went wrong","error":err.message})
        console.log(err)
    }
    
})

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const user=await UserModel.find({email})
        const hashed_password=user[0].password

        console.log(user)

        if(user.length>0){
            bcrypt.compare(password,hashed_password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userId:user[0]._id},process.env.key);
                    res.send({"msg":"User Login Successfully","token":token})
                }
                else{
                    res.send("please enter credentials")
                }
            })
            
        }else{
            res.send("wrong credentials")
        }
    }catch(err){
        res.send({"msg":"something went wrong","error":err.message})
        console.log(err)
    }

})
module.exports={userRouter}