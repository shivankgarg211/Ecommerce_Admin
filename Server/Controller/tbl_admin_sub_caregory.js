const connection = require("../Modal/database");

const viewcategory = async (req, res) => {
  try {
    const data = req.body;
    const sqlQuery = "SELECT * FROM tbl_adminproduct_category";
     connection.query(sqlQuery, data, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      } else {
        console.log(result)
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMeassage);
    res.status(error.sqlMeassage);
  }
};

const view_sub_category = async (req, res) => {
  try {
    const data = req.body;
    const sqlQuery = "SELECT * FROM tbl_admin_sub_category";
     connection.query(sqlQuery, data, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      } else {
        console.log(result)
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMeassage);
    res.status(error.sqlMeassage);
  }
};

const addsubcategory = async (req, res) => {
  try {
    let imageData = {image:null}
    if (req.file && req.file.filename) {
      imageData.image = req.file.filename;
    }
    const data = {
      cid: req.body.cid,
      subcategory_id: req.body.subcategory_id,
      subcategory_name: req.body.subcategory_name,
      ...imageData,
    };
    const sqlQuery = "INSERT INTO tbl_admin_sub_category SET ?";
    await connection.query(sqlQuery, [data], function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json(error.sqlMessage);
      } else {
        console.log(result)
        res.json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMeassage);
    res.status(500).json(error.sqlMeassage);
  }
};

const updatesubcategory = async (req, res) => {
  try {
    const id = req.params.subcategory_id;
    const data = [
      req.body.subcategory_name,
      req.file.filename,
    ];
    const sqlQuery = `UPDATE tbl_admin_sub_category SET subcategory_name = ?,image = ?,addon = current_timestamp()
  WHERE subcategory_id = ?`;
    await connection.query(sqlQuery, [...data, id], function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: error.sqlMessage }); // Updated this line
      } else {
        console.log(result);
        res.status(200).json({ message: "Update successful" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { viewcategory, addsubcategory, updatesubcategory, view_sub_category };
