var express = require('express');
var router = express.Router();
const adminController=require("../Controllers/admins");
const userController=require("../Controllers/users");
const contactController=require("../Controllers/contacts");
const USER=require('../Model/user');

// This Route is For Admins
router.get('/admin',adminController.Admin_secure, adminController.Alladmin);
router.post('/admin/newadmin', adminController.New_admin);
router.post('/admin/adminlogin', adminController.Admin_login);
router.delete('/admin/removeadmin/:aid',adminController.Delete_admin)
router.put('/admin/updateadmin/:aid',adminController.Update_admin)

// This Route is For Users
router.get('/user',userController.User_secure, userController.Alluser)
router.post('/user/newuser',userController.New_user)
router.post('/user/userlogin',userController.User_login)
router.delete('/user/removeuser/:email',userController.Delete_user)
router.put('/user/updateuser/:email',userController.Update_user)

// This Route is For Contacts  
router.get('/contact',contactController.Allcontact)
router.post('/contact/newcontact',contactController.New_contact)
router.delete('/contact/removecontact/:ref_number',contactController.Delete_contact)
router.put('/contact/updatecontact/:ref_number',contactController.Update_contact)

module.exports = router;
  