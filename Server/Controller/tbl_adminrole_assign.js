const connection = require("../Modal/database");

const addadminRoleassign = async (req, res) => {
  try {
    const data = [req.body.uid, req.body.role_id];
    const sqlQuery = `INSERT INTO tbl_adminrole_assign (uid , role_id) VALUES(?, ?) `;
    await connection.query(sqlQuery, data, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      } else {
        
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMessage);
    res.status(500).json(error.sqlMessage);
  }
};

const getAdminRoleAssign = async (req, res) => {
  try {
    const uid = req.params.uid;
    const sqlQuery = 'select role_name from tbl_adminrole where role_id in (select role_id from tbl_adminrole_assign where uid = ?)';
    await connection.query(sqlQuery, uid, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      } else {
        res.status(200).json(result);
        
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMessage);
    res.status(500).json(error.sqlMessage);
  }
};

const revokeRole =async(req,res) =>{
        try{
                const data = [req.params.uid,req.params.role_id];
                const sqlQuery =`DELETE FROM tbl_adminrole_assign WHERE uid = uid AND role_id = role_id`;
                await connection.query(sqlQuery,data,function(error,result){
                        if(error){
                                console.log("Error",error.sqlMessage)
                                res.status(500).json(error.sqlMessage)
                        }else{
                                
                                res.status(result)
                 
                        }
                })
        }catch (error) {
                console.log("Error", error.sqlMessage);
                res.status(500).json(error.sqlMessage);
              }

}

module.exports = { addadminRoleassign, getAdminRoleAssign,revokeRole };
