import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import { Pagination } from "react-bootstrap";
import Button from "react-bootstrap/Button";
 import "./role.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function Role() {
  //  modal show ke liye /////

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newroleid, setnewRoleId] = useState("");
  const [updaterole, setupdaterole] = useState({
    role_name: "",
  });

  const update = (role_id, role_name) => {
    console.log(role_id, role_name);
    setnewRoleId(role_id);
    setupdaterole({
      ...updaterole,
      role_name: role_name,
    });
    handleShow();
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5003/api/admin/updaterole/` + newroleid,
        updaterole
      )
      .then((res) => {
        console.log(res);
        getData()
       handleClose()
      })
      .catch((err) => console.log(err));
  };

  const [data, setData] = useState([]); // get role
  const [item, setItem] = useState({     // post role
    role_id: "",
    role_name: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // pagination
  const itemsPerPage = 4; //pagination
  ////pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // Pagination


  // get api
  
  useEffect(() => {
    // axios
    //   .get("http://localhost:5003/api/admin/viewrole")
    //   .then((result) => {
    //     console.log(result.data);
    //     setData(result.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    getData();
  }, []);
  async function getData() {
    axios
      .get("http://localhost:5003/api/admin/viewrole")
      .then((result) => {
        // console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // post api

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (item.role_name !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5003/api/admin/postrole",
          item
        );
        // Check if response status is OK (2xx) before navigating
        if (response.status >= 200 && response.status < 300) {
          navigate("/role");
          getData();
        } else {
          console.error("Server error:", response.statusText);
          // Handle server errors appropriately
        }
      } catch (error) {
        console.error("Error:", error.message);
        // Handle network errors or other exceptions
      }
    }
  };
  //   end post api
  return (
    <div>
      <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4 ">
          <div className="Role1 p-3 border">
            <Form onSubmit={handleSubmit}>
              <h4>Add New Role</h4>
              <br />
              <Form.Group controlId="roleId">
                <Form.Label>
                  <h6>Enter The Role Id</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Role Id"
                  onChange={(e) => setItem({ ...item, role_id: e.target.value })}
                />
                <div className="text-danger"></div>
              </Form.Group>
              <br />
              <Form.Group controlId="roleName">
                <Form.Label>
                  <h6>Assign The Role Name</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Role Name"
                  onChange={(e) => setItem({ ...item, role_name: e.target.value })}
                />
                <div className="text-danger"></div>
              </Form.Group>
              <br />
              <Button className="btnrole" variant="info" type="submit">
                Save
              </Button>
              <br />
            </Form>
          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="tablerole p-3 border">
            <h4>Role List</h4>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Search by Role Name" />
            </Form.Group>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">Role Id</th>
                  <th className="text-center">Role Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.role_id}</td>
                    <td>{item.role_name}</td>
                    <td className="text-center">
                      <Button
                        variant="info"
                        onClick={() => update(item.role_id, item.role_name)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Pagination */}
            <ul className="pagination justify-content-center">
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
            {/* End pagination */}
          </div>
        </div>
      </div>
    </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Role name</Form.Label>
            <Form.Control
              type="text"
              name="role_name"
              placeholder="Enter Role Name"
              autoComplete="off"
              onChange={(e) =>
                setupdaterole({
                  ...updaterole,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => handleUpdate()}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Role;
