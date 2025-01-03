
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const user = new Schema({
  
  fname: {
    type :String,
    required:true
  },
  mname:  {
    type :String,
    required:true
  },
  lname:  {
    type :String,
    required:true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type :String,
    required:true
  },
  dob: {
    type :String,
    required:true
},
  phone:{
    type:String,
    required:true
  }

});
module.exports = mongoose.model("User", user);