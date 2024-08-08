const joi = require("joi");

const schema = joi.object({
  uid: joi.string().min(1).max(1000).required(),
  name: joi.string().min(3).max(20).required(),
  email: joi.string().min(3).max(320).email().required(), // Adjusted maximum length and added email validation
  image:joi.string().min(2).max(200).optional(),
  password: joi.string().min(5).max(200).required(),
  mobile: joi.string().min(1).max(15).required(), // Adjusted maximum length
  aadhar: joi.string().min(1).max(14).required(),
  doj: joi.date().required(),
  qualification: joi.string().min(1).max(20).required(),
  dob: joi.date().required(),
  address: joi.string().min(5).max(100).required(),
  state: joi.string().min(3).max(50).required(), // Adjusted maximum length
  city: joi.string().min(2).max(50).required(), // Adjusted maximum length
  pin: joi.string().min(6).max(6).required(),
});
// console.log(schema)

const tbl_adminuser_validation = (req, res, next) => {
  const { error} = schema.validate(req.body);
  if (error) {
    console.log(error)
    return res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

module.exports = tbl_adminuser_validation;
