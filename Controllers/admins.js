const ADMIN=require('../Model/admin')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.Admin_secure=async function(req, res, next) {
  try {
    const token=req.headers.authorization
    if(!token)
    {
      throw new  Error ("Please Enter Your Token")
    }
    const dtoken=jwt.verify(token,"VIRUS")
    console.log(dtoken);
    
    const validuser=await ADMIN.findById(dtoken.aid)
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
exports.Alladmin=async function(req, res, next) {
  try {
    const alladmin =await ADMIN.find()
    res.status(200).json({
      status:"Success For Get All Admin",
      data:alladmin

    })
  } catch (error) {
    res.status(404).json({
      status:"Failed To Load The Data",
      error:error.message
    })
  }
}
exports.New_admin=async function(req, res, next) {
    try {
      if(!req.body.aid || !req.body.apass || !req.body.fname || !req.body.lname || !req.body.email){
      throw new Error ("Please enter Your All Details For Admin Data")
      }
      req.body.apass=bcrypt.hashSync(req.body.apass,10)
      const newadmin =await ADMIN.create(req.body)
      res.status(200).json({
        status:"Success For Add New Admin",
        data:newadmin
  
      })
    } catch (error) {
      res.status(404).json({
        status:"Failed To Create The Admin",
        error:error.message
      })
    }
  }
  exports.Admin_login=async function(req, res, next) {
    try {
      if(!req.body.aid || !req.body.apass ){
      throw new Error ("Please enter Your All Details For Admin Login")
      }
     const checkid=await ADMIN.findOne({aid:req.body.aid})
     if(!checkid)
     {
      throw new Error("Id is not Found")
     }
     const checkpass=bcrypt.compareSync(req.body.apass,checkid.apass)
     if(!checkpass)
      {
        throw new Error("Password is not Correct")
      }
      const token=jwt.sign({aid:checkid._id},"VIRUS")

      res.status(200).json({
        status:"Success Admin Login",
        data:checkid,token
  
      })
    } catch (error) {
      res.status(404).json({
        status:"Failed To Login The Admin",
        error:error.message
      })
    }
  }
  exports.Delete_admin=async function(req, res, next) {
    try {
      const{aid}=req.params
      const checkadmin=await ADMIN.findById(aid)
      if(!checkadmin){
        throw new Error("Admin Not Found") 
      }
      const deleteadmin=await  ADMIN.findByIdAndDelete(checkadmin)
      res.status(202).json({
        status:"Admin Deleted Successfully",
        data:deleteadmin
      })
    } catch (error) {
      res.status(404).json({
        status:"Failed To Delete The Admin",
        error:error.message
      })
    }
  }
  exports.Update_admin=async function(req, res, next) {
    try {
      const {aid} =req.params
      if(!req.body.apass || !req.body.fname || !req.body.lname || !req.body.email){
        throw new Error("Please Enter Your All Details For Admin Data")
      }
      const updateadmin=await ADMIN.findByIdAndUpdate(aid,req.body)
      if(!updateadmin){
        throw new Error("Admin aid Not Found")
      }
      res.status(202).json({
        status:"Admin Updated Successfully",
        data:updateadmin
      })
    } catch (error) {
      res.status(404).json({
        status:"Failed To Edit the Admin",
        error:error.message
      })
    }
  }