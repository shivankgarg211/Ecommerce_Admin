const express = require ('express');
const adminrole = express.Router();

const {getAdminRole,postAdminRole,updateAdminRole, deleteAdminRole} = require("../Controller/tbl_adminrole")

adminrole.get("/api/admin/viewrole", getAdminRole)
adminrole.post("/api/admin/postrole", postAdminRole)
adminrole.put("/api/admin/updaterole/:role_id",updateAdminRole)
adminrole.delete("/api/admin/deleterole/:role_id",deleteAdminRole)
module.exports = adminrole