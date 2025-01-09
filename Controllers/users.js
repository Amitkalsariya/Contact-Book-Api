const USER=require('../Model/user')
const bcrypt=require("bcrypt")  
const jwt=require("jsonwebtoken")
exports.User_secure=async function(req, res, next) {
  try {
    const token=req.headers.authorization
    if(!token)
    {
      throw new  Error ("Please Enter Your Token")
    }
    const dtoken=jwt.verify(token,"MALWARE")
    console.log(dtoken);
    
    const validuser=await USER.findById(dtoken.email)
    if(!validuser)
    {
      throw new Error("User Not Found")
    }
    next()
  } catch (error) {
    res.status(404).json({
      status:"Failed To Load The Data",
      error:error.message
    })
  }
}
exports.Alluser=async function(req,res) {
    try {
        const alluser=await USER.find()
       res.status(200).json({
        status:"Success For Get All User",
        data:alluser

       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Load The Data",
            error:error.message
        })
    }
}
exports.New_user=async function(req,res) {
  try {
      if(!req.body.fname || !req.body.mname || !req.body.lname || !req.body.email || !req.body.password || !req.body.dob || !req.body.phone){
      throw new Error ("Please enter Your All Details For User Data")
      }
      req.body.password=bcrypt.hashSync(req.body.password,11)
      const newuser=await USER.create(req.body)
     res.status(200).json({
      status:"Success For Add New User",
      data:newuser

     }) 
  } catch (error) {
      res.status(404).json({
          status:"Failed To Create The User",
          error:error.message
      })
  }
}
exports.User_login=async function(req,res) {
    try {
        if(!req.body.email || !req.body.password ){
        throw new Error ("Please enter Your All Details For User Data")
        }
        const checkuid=await USER.findOne({email:req.body.email})
        if(!checkuid)
        {
            throw new Error("User Id is not Correct")    
        }
        const checkuserpassword=bcrypt.compareSync(req.body.password,checkuid.password)
        if(!checkuserpassword){
            throw new Error("User Password is Not Correct")
        }
        const token=jwt.sign({email:checkuid._id},"MALWARE",{
            expiresIn:"1h"
        })
       res.status(200).json({
        status:"User Login Successfully",
        data:checkuid,token
  
       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Login The User",
            error:error.message
        })
    }
  }
exports.Delete_user=async function(req,res) {
    try {
        const {email}=req.params
        const checkuser=await USER.findById(email)
        if(!checkuser)
        {
            throw new  Error ("User Id Not Found")
        }
        const deleteuser=await USER.findByIdAndDelete(checkuser)
       res.status(200).json({
        status:"Success For Delete The Existing User",
        data:deleteuser
  
       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Delete The User",
            error:error.message
        })
    }
  }
  exports.Update_user=async function(req,res) {
    try {
        const {email}=req.params
        if(!req.body.fname || !req.body.mname || !req.body.lname || !req.body.password || !req.body.dob || !req.body.phone){
            throw new Error ("Please enter Your All Details For User Data")
            }
     
      const updateuser=await USER.findByIdAndUpdate(email,req.body)
       res.status(200).json({
        status:"User Information Is Successfully Updated",
        data:updateuser
  
       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Edit  The User",
            error:error.message
        })
    }
  }