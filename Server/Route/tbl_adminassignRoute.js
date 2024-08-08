const express = require('express')
const adminroleassign = express.Router();



const {addadminRoleassign,getAdminRoleAssign,revokeRole} = require('../Controller/tbl_adminrole_assign')

 adminroleassign.post("/api/admin/roleassign/addadminroleassign", addadminRoleassign)
 adminroleassign.get("/api/admin/roleassign/getadminroleassign/:uid", getAdminRoleAssign)
 adminroleassign.delete("/api/admin/roleassign/revokeRole",revokeRole)


 module.exports = adminroleassign