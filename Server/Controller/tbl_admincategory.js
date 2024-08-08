const connection = require("../Modal/database");

const getcategory = async (req, res) => {
  try {
    const data = req.body;
    const sqlQuery = "SELECT * FROM tbl_adminproduct_category ";
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

const postcategory =  (req, res) => {
  try {
    const data = {
      cid: req.body.cid,
      cname: req.body.cname,
    };
    const sqlQuery = "INSERT INTO  tbl_adminproduct_category SET ?";
     connection.query(sqlQuery, data, function (error, result) {
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

const updatecategory = async (req, res) => {
  try {
    const data = [req.body.cname, req.params.cid];
    const sqlQuery =
      "UPDATE tbl_adminproduct_category SET `cname` = ? WHERE `cid` = ?";
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

module.exports = { getcategory, postcategory, updatecategory };
