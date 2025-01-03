const ADMIN=require('../Model/admin')

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