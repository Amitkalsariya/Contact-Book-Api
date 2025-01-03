var express = require('express');
var router = express.Router();
const adminController=require("../Controllers/admins");
const userController=require("../Controllers/users");
const contactController=require("../Controllers/contacts");
const USER=require('../Model/user');

// This Route iS For Admins
router.get('/admin', adminController.Alladmin);
router.post('/admin/newadmin', adminController.New_admin);
router.delete('/admin/removeadmin/:aid',adminController.Delete_admin)
router.put('/admin/updateadmin/:aid',adminController.Update_admin)

// This Route iS For Users
router.get('/user',userController.Alluser)
router.post('/user/newuser',userController.New_user)
router.delete('/user/removeuser/:email',userController.Delete_user)
router.put('/user/updateuser/:email',userController.Update_user)

// This Route iS For Contacts
router.get('/contact',contactController.Allcontact)
router.post('/contact/newcontact',contactController.New_contact)
router.delete('/contact/removecontact/:ref_number',contactController.Delete_contact)
router.put('/contact/updatecontact/:ref_number',contactController.Update_contact)

module.exports = router;
