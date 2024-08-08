const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const adminuser = require("./Route/tbl_adminuserRoute");
app.use("/", adminuser);

const adminrole = require("./Route/tbl_adminroleRoute");
app.use("/", adminrole);

const admincategory = require("./Route/tbl_adminRoutecategory");
app.use("/", admincategory);

const adminsubcategory = require('./Route/tbl_admin_sub_categoryRoute')
app.use("/",adminsubcategory)

const adminroleassign = require('./Route/tbl_adminassignRoute')
app.use("/",adminroleassign)

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

app.use(express.static("Public"));
app.listen(port, () => {
  console.log(`connection established ${port}`);
});
