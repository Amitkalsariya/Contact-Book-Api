const USER = require('../Model/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
// let otp=Math.floor(1000+Math.random()*9000)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "amitkalsariya2023.katargam@gmail.com",
    pass: "nmmesbhhyzinyrpz",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(mail) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'amitkalsariya2023.katargam@gmail.com', // sender address
    to:mail, // list of receivers
    subject: "Welcome In to Testing Mail Services", // Subject line
   
    html: "<b style='color:red'>Bol na Buud Ke ball</b> "
    , // html body
  });
}
 
exports.User_secure = async function (req, res, next) {
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new Error("Please Enter Your Token")
    }
    const dtoken = jwt.verify(token, "MALWARE")
    console.log(dtoken);

    const validuser = await USER.findById(dtoken.email)
    if (!validuser) {
      throw new Error("User Not Found")
    }
    next()
  } catch (error) {
    res.status(404).json({
      status: "Failed To Load The Data",
      error: error.message
    })
  }
}
exports.Alluser = async function (req, res) {
  try {
    const alluser = await USER.find()
    res.status(200).json({
      status: "Success For Get All User",
      data: alluser

    })
  } catch (error) {
    res.status(404).json({
      status: "Failed To Load The Data",
      error: error.message
    })
  }
}
exports.New_user = async function (req, res) {
  try {
    if (!req.body.fname || !req.body.mname || !req.body.lname || !req.body.email || !req.body.password || !req.body.dob || !req.body.phone) {
      throw new Error("Please enter Your All Details For User Data")
    }
    req.body.password = bcrypt.hashSync(req.body.password, 11)
    const newuser = await USER.create(req.body)
    await main(newuser.email)
    res.status(200).json({
      status: "Success For Add New User",
      data: newuser

    })
  } catch (error) {
    res.status(404).json({
      status: "Failed To Create The User",
      error: error.message
    })
  }
}
exports.User_login = async function (req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please enter Your All Details For User Data")
    }
    const checkuid = await USER.findOne({ email: req.body.email })
    if (!checkuid) {
      throw new Error("User Id is not Correct")
    }
    const checkuserpassword = bcrypt.compareSync(req.body.password, checkuid.password)
    if (!checkuserpassword) {
      throw new Error("User Password is Not Correct")
    }
    const token = jwt.sign({ email: checkuid._id }, "MALWARE")
    res.status(200).json({
      status: "User Login Successfully . ",
      data: checkuid, token

    })
  } catch (error) {
    res.status(404).json({
      status: "Failed To Login The User",
      error: error.message
    })
  }
}
exports.Delete_user = async function (req, res) {
  try {
    const { email } = req.params
    const checkuser = await USER.findById(email)
    if (!checkuser) {
      throw new Error("User Id Not Found")
    }
    const deleteuser = await USER.findByIdAndDelete(checkuser)
    res.status(200).json({
      status: "Success For Delete The Existing User",
      data: deleteuser

    })
  } catch (error) {
    res.status(404).json({
      status: "Failed To Delete The User",
      error: error.message
    })
  }
}
exports.Update_user = async function (req, res) {
  try {
    const { email } = req.params
    if (!req.body.fname || !req.body.mname || !req.body.lname || !req.body.password || !req.body.dob || !req.body.phone) {
      throw new Error("Please enter Your All Details For User Data")
    }

    const updateuser = await USER.findByIdAndUpdate(email, req.body)
    res.status(200).json({
      status: "User Information Is Successfully Updated",
      data: updateuser

    })
  } catch (error) {
    res.status(404).json({
      status: "Failed To Edit  The User",
      error: error.message
    })
  }
}