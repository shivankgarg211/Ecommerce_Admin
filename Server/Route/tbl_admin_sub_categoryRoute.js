const express = require ('express');
const upload = require('../Multer_image/multer')


const adminsubcategory = express.Router();

const {viewcategory,addsubcategory,updatesubcategory, view_sub_category} = require('../Controller/tbl_admin_sub_caregory')


adminsubcategory.get("/api/admin/subcategory/viewcategory",viewcategory)
adminsubcategory.get("/api/admin/subcategory/view_sub_category",view_sub_category)
adminsubcategory.post("/api/admin/subcategory/addsubcategory",upload.single('image'),addsubcategory)
adminsubcategory.put("/api/admin/subcategory/updatesubcategory/:subcategory_id",upload.single('image'),updatesubcategory)

module.exports= adminsubcategory