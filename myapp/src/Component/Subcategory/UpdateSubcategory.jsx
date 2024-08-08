import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// import Subcategory from "./Subcategory";

function UpdateSubcategory({ props }) {
  const subId = props;
  // edit api
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data,setData] = useState({
        subcategory_name:'',
        image:null
  })

  const handleUpdate = (e) => {      
    e.preventDefault();
    const formData = new FormData();
    formData.append("subcategory_name", data.subcategory_name);
    formData.append("image", data.image);

    axios
      .put(
        `http://localhost:5003/api/admin/subcategory/updatesubcategory/${subId}`,formData
      )
      .then((res) => {
        console.log(res);
        alert("Data updated successfully!");
        setData({
                subcategory_name:res.data.subcategory_name,
                image: res.data.image
        });
        handleClose()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button onClick={handleShow}>

      <EditOutlinedIcon />
      </Button>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "8vh" }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <h4>Update Sub Category</h4>
            <br />
            <Form.Group controlId="subCategoryName">
              <Form.Label>
                <h6>SubCategory Name</h6>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter SubCategory Name" 
              value={data.subcategory_name}
                onChange={(e) => setData({ ...data, subcategory_name: e.target.value })}/>
              <div className="text-danger"></div>
            </Form.Group>
            <br />
            <Form.Group controlId="photo">
              <Form.Label>
                <h6>Photo</h6>
              </Form.Label>
              <Form.Control type="file" placeholder="Upload Photo" 
               onChange={(e) => setData({ ...data, image: e.target.files[0] })}/>
              <div className="text-danger"></div>
            </Form.Group>
            <br />
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateSubcategory;
