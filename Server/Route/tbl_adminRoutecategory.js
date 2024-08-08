const express = require('express')
const admincategory = express.Router()


const {getcategory,postcategory,updatecategory} = require('../Controller/tbl_admincategory')

admincategory.get("/api/admin/category/viewcategory",getcategory)
admincategory.post("/api/admin/category/postcategory",postcategory)
admincategory.put("/api/admin/category/updatecategory/:cid",updatecategory)

module.exports= admincategory