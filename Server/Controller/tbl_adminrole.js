const connection = require("../Modal/database");

const getAdminRole = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM tbl_adminrole";
    const data = req.body;
    await connection.query(sqlQuery, data, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        
        res.json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMessage);
    res.status(500).json({ error: error.sqlMessage });
  }
};

const postAdminRole = async (req, res) => {
  try {
    const data = {
      role_id: req.body.role_id,
      role_name: req.body.role_name,
    };
    const sqlQuery = "INSERT INTO tbl_adminrole SET ?";
     await connection.query(sqlQuery, data, function (error, result) {
      if (error) {
        console.log("Error:", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage }); // Sending error response to the client
      } else {
        
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message }); // Sending error response to the client
  }
};

const updateAdminRole = async (req, res) => {

      try {
          const data = [req.body.role_name, req.params.role_id]; // Reordered data array
          const sqlQuery = "UPDATE tbl_adminrole SET `role_name` = ? WHERE `role_id` = ?"; // Removed semicolon from the end
          await connection.query(sqlQuery, data, function (error, result) {
              if (error) {
                  console.error("Error:", error.sqlMessage);
                  res.status(500).json({ error: error.sqlMessage }); // Sending error response to the client
              } else {
                  
                  res.json(result);
              }
          });
      } catch (error) {
          console.error("Error:", error.message);
          res.status(500).json({ error: error.message }); // Sending error response to the client
      }
  };
  
  const deleteAdminRole =(req, res) => {
          const role_id = req.params.role_id;
          const sqlQuery = "DELETE FROM tbl_adminrole WHERE role_id = ?";
          connection.query(sqlQuery, role_id,(err, result)=>{
            if(err){
                  console.log("Data Not Delete");
                  res.json(err);
            }else{
                  res.json(result)
                  console.log("Data Delete SuccessFully...")
            }

          })
  };



// const deleteAdminRole = async (req, res) => {
//       try {
//           const roleIdToDelete = req.params.role_id; // Assuming you get the role ID from the URL params
  
//           if (!roleIdToDelete) {
//               return res.status(400).json({ error: "Role ID is required to delete" });
//           }
  
//           const sqlQuery = "DELETE FROM tbl_adminrole WHERE role_id = ?";
//           const data = [roleIdToDelete];
  
//           await connection.query(sqlQuery, data, (error, result) => {
//               if (error) {
//                   console.error("Database Error:", error);
//                   return res.status(500).json({ error: "Role deletion failed" });
//               } else {
//                   if (result.affectedRows === 0) {
//                       return res.status(404).json({ error: "Role not found" });
//                   }
//                   res.status(200).json({ message: "Role deleted successfully" });
//               }
//           });
//       } catch (error) {
//           console.error("Server Error:", error);
//           res.status(500).json({ error: "Server error" });
//       }
//   };
  

module.exports = { getAdminRole, postAdminRole,updateAdminRole,deleteAdminRole };
