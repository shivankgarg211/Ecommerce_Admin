const connection = require("../Modal/database");
const bcrypt = require("bcrypt");
const joi = require("joi");


const getAdminuser = async (req, res) => {
  try {
    let sqlQuery = "SELECT * FROM tbl_adminuser";
    let data = req.body;
    await connection.query(sqlQuery, data, function (error, result) {
      if (error) {
        console.log("error".sqlMessage);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error.sqlMessage);
  }
};



const postAdminuser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let sqlQuery = "INSERT INTO tbl_adminuser SET ?";
    let imageData = { image: null }; // Default image data
    // Check if req.file exists before accessing its properties
    if (req.file && req.file.filename) {
      imageData.image = req.file.filename;
    }
    const data = {
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
      ...imageData, // Spread image data here
      aadhar: req.body.aadhar,
      doj: req.body.doj,
      qualification: req.body.qualification,
      dob: req.body.dob,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      pin: req.body.pin,
      countries: req.body.countries,
    };
    console.log(data);
    await connection.query(sqlQuery, [data], (err, result) => {
      if (err) {
        console.log("Error", err.sqlMessage);
        console.log(err);
        res.send({ status: false });
      } else {
        res.json({ status: true, result });
      }
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateAdminuser = async (req,res) =>{
  try{
     let sqlQuery = "UPDATE tbl_adminuser SET name = ?, email = ? , qualification =?, address = ? Where uid = ?";
     let data = [req.body.name, req.body.email, req.body.qualification,req.body.address, req.params.uid]
     await connection.query(sqlQuery,data,function(error, result){
      if(error){
        console.log("Error", error.sqlMessage);
        res.json({error:'Internal server error'});
      } else{
        res.json({message:'user updated successfully'})
      }
     });

  }catch(error){
          res.status(500).json({error:'Internal server error'})
      }

}
// const updateusersstatus = async(req,res) =>{
//    try{
//      const userUid = req.params.uid;
//      const status = req.body;
//      const sqlQuery = 
//    }
// }

const getAdminuseruid = async(req,res) =>{
  try{
    const uid = req.params.uid;
    const sqlQuery ="select * from tbl_adminuser where uid = ?"
    await connection.query(sqlQuery,[uid],function(err,result){
      if(err){
        console.log("err",error.sqlMessage)
        res.status(500).json({error:"Internal server Error"})
      }else{
        res.json(result)
        console.log(result)
      }
    })

  }catch(err) {
    console.log("error found")
  }
}
 const updateStatusactive = async(req,res)=>{
  try{
    const uid =req.params.uid;
    const sqlQuery = "UPDATE tbl_adminuser SET status = 'active'  WHERE uid = ?"
    await connection.query(sqlQuery,uid,function(error,result){
      if(error){
        console.log("err",error.sqlMessage)
        res.status(500).json({error:"status not update"})
      }else{
        res.json(result)
        console.log(result)
      }
    })
  }catch(error) {
    console.log("error found")
  }
 }

 const  updateStatusdeactive = async(req,res) =>{
  try{
    const uid =req.params.uid;
    const sqlQuery = "UPDATE tbl_adminuser SET status = 'deactive'  WHERE uid = ?"
    await connection.query(sqlQuery,uid,function(error,result){
      if(error){
        console.log("err",error.sqlMessage)
        res.status(500).json({error:"Internal server Error"})
      }else{
        res.json(result)
        console.log(result)
      }
    })
  }catch(error) {
    console.log("error found")
  }
 }



module.exports = { getAdminuser, postAdminuser,updateAdminuser,getAdminuseruid,updateStatusactive,updateStatusdeactive };
