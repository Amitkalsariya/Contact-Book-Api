const CONTACT=require('../Model/contact');

exports.Allcontact=async function(req,res) {
    try {
        const allcontact=await CONTACT.find()
       res.status(200).json({
        status:"Success For Get All Contacts",
        data:allcontact

       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Load The Data",
            error:error.message
        })
    }
}
exports.New_contact=async function(req,res) {
  try {
    if(!req.body.fullname || !req.body.email || !req.body.mobileno || !req.body.address || !req.body.companyname || !req.body.position){
        throw new Error("Please Enter Your All Details For Contact Data")
    }
    const newcontact=await CONTACT.create(req.body)
     res.status(200).json({
      status:"Success For Add New Contact",
      data:newcontact

     }) 
  } catch (error) {
      res.status(404).json({
          status:"Failed To Create The Contact",
          error:error.message
      })
  }
}
exports.Delete_contact=async function(req,res) {
    try {
      const {ref_number}=req.params
      const checkcontact=await CONTACT.findById(ref_number)
      if(!checkcontact)
      {
         throw new Error ("Contact Reference Id Not Found")
        
         
      }
      const deletecontact=await CONTACT.findByIdAndDelete(checkcontact)
       res.status(200).json({
        status:"Success For Delete the Contact",
        data:deletecontact
  
       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Delete The Contact",
            error:error.message
        })
    }
  }
  exports.Update_contact=async function(req,res) {
    try {
      const {ref_number}=req.params
       if(!req.body.fullname || !req.body.email || !req.body.mobileno || !req.body.address || !req.body.companyname || !req.body.position){
        throw new Error("Please Enter Your All Details For Contact Data")
       }
       const editcontact=await CONTACT.findByIdAndUpdate(ref_number,req.body)
       if(!editcontact)
       {
        throw new Error("Contact's reference Id Not Found")
       }
       res.status(200).json({
        status:"Contact Is Updated Successfully",
        data:editcontact
  
       }) 
    } catch (error) {
        res.status(404).json({
            status:"Failed To Edit The Contact",
            error:error.message
        })
    }
  }