
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const contact = new Schema({
  ref_number:{
    type:String,
    unique:true,
    required:true
  },
  fullname: {
    type :String,
    required:true
  },
  email:  {
    type :String,
    required:true,
    unique:true
  },
  mobileno:  {
    type :String,
    required:true,
    unique:true
  },
  address: {
    type: String,
  },
  companyname: {
    type :String,
    required:true
  },
  position: {
    type :String,
    required:true
}

});
module.exports = mongoose.model('contact', contact);