
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const admin = new Schema({
  aid: {
    type: String,
    unique: true,
    required:true
  },
  apass: {
    type :String,
    required:true
  },
  fname: {
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
  }
});
module.exports = mongoose.model('administrator', admin);