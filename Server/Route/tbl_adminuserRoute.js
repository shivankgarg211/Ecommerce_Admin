const express = require ('express')
 const adminuser = express.Router()
//  const multer = require("multer") ;
//  const path = require('path');
const upload = require('../Multer_image/multer')

   
 
 
// const tbl_adminuser_validation = require('../Validation/tbl_adminuser')
 const {getAdminuser,postAdminuser,updateAdminuser,getAdminuseruid,updateStatusactive, updateStatusdeactive} = require('../Controller/tbl_adminuser');

 adminuser.get("/api/admin/viewusers", getAdminuser)
 adminuser.post("/api/admin/postusers",upload.single('image'), postAdminuser)
 adminuser.put("/api/admin/updateusers/:uid", updateAdminuser)
 adminuser.patch("/api/admin/Statusactive/:uid", updateStatusactive)
 adminuser.patch("/api/admin/Statusdeactive/:uid", updateStatusdeactive)

adminuser.get("/api/admin/viewuser/:uid",getAdminuseruid)
 module.exports = adminuser