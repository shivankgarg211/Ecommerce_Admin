import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import "./category.css";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { Pagination } from "react-bootstrap";

function Category() {
  const [data, setData] = useState([]); // get

  useEffect(() => {
  getData()
  }, []);
  async function getData() {
    axios
      .get("http://localhost:5003/api/admin/category/viewcategory")
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  ////   post

  const [item, setItem] = useState({
    cid: "",
    cname: "",
  });

  const navigate = useNavigate();
  const handleSubmit = () => {
    //  e.preventDefault();
    if (item.cname !== "") {
      axios
        .post("http://localhost:5003/api/admin/category/postcategory", item)
        .then((response) => {
          console.log(response);
          navigate("/category");
          setItem(response.data);
          alert("Data successfully inserted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //  Edit category
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //update ke liye useState
  const [newcid, setnewCid] = useState("");
  const [updatecategory, setupdatecategory] = useState({
    cname: "",
  });

  const update = (cid, cname) => {
    console.log(cid, cname);
    setnewCid(cid);
    setupdatecategory({
      ...updatecategory,
      cname: cname,
    });
    handleShow();

  };

  const handleUpdate = (e) => {
      e.preventDefault()
    axios
      .put(
        `http://localhost:5003/api/admin/category/updatecategory/` + newcid,
        updatecategory
      )
      .then((res) => {
        console.log(res);
       if (res.data.status) {
        alert("Data  not Updated");
      } else {
        alert("Data updated Succesfully");
      }
      handleClose();
      getData()
      
      })
      .catch((err) => console.log(err));
  };
    //   pagination
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const itemsPerPage = 4; 
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);



  return (
    <div>
      <div style={{ display: "flex" }} className="mt-5">
        <div className="Category">
          <Form onSubmit={handleSubmit}>
            <h4>Add New</h4>
            <br />
            <Form.Label>
              <h6>Category Id</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category ID"
              onChange={(e) => setItem({ ...item, cid: e.target.value })}
            />
            <br />
            <Form.Label>
              <h6>Category Name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category Name"
              onChange={(e) => setItem({ ...item, cname: e.target.value })}
            />
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </div>
        <div className="tablecat">
          <h4>Category List</h4>
          <Form.Group>
            <Form.Control type="text" placeholder="Search by Category Name" />
          </Form.Group>
          <br />
          <Table striped bordered hover >
            <thead>
              <tr>
                <th className="text-center">Category Id</th>
                <th className="text-center">Category Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((i, index) => (
                <tr key={index}>
                  <td>{i.cid}</td>
                  <td>{i.cname}</td>
                  <td>
                    <Button variant="info" onClick={() => update(i.cid, i.cname)}>
                      <ModeEditOutlineTwoToneIcon  />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ul className="pagination">
          <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </ul>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}
       >
        <Modal.Header closeButton style={{marginTop:"8vh"}}>
          <Modal.Title>Update category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Catergory Name</Form.Label>
              <Form.Control
                type="text"
                name="cname"
                placeholder="Enter Category name"
                value={updatecategory.cname}
                onChange={(e) =>
                  setupdatecategory({
                    ...updatecategory,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Category;
