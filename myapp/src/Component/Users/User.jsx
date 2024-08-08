import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Button, Pagination, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { BiPencil, BiDetail } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import RoleAssign from "./roleAssign";
import moment from "moment";
import './user.css'


function User() {
  const [data, setData] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false); //upadate user modal
  const [selectedUser, setSelectedUser] = useState(null); // update user variable
  const [selectedUserDetails, setSelectedUserDetails] = useState(null); //details user
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false); // details user Modal

  // const [showAssignModal, setShowAssignModal] = useState(false); // Assign role ke liye modal
  // const [selectedRole, setSelectedRole] = useState(null);
  // // const [userRoles, setUserRoles] = useState([]);
  // const [role] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/admin/viewusers")
      .then((result) => setData(result.data))
      .catch((error) => console.log(error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  /// upadate user////////////////

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleupdateUser = () => {
    axios
      .put(`http://localhost:5003/api/admin/updateusers/${selectedUser.uid}`, {
        name: selectedUser.name,
        email: selectedUser.email,
        qualification: selectedUser.qualification,
        address: selectedUser.address,
        // update other field to add field
      })
      .then((response) => {
        console.log(response.data);
        const updateData = data.map((user) =>
          user.uid === selectedUser.uid ? { ...user, ...response.data } : user
        );
        setData(updateData);
        handleCloseEditModal();
      })
      .catch((error) => {
        console.log("Error updating user", error);
      });
  };
  ///// //////////////end update user////////////////////////////////////

  // userdetails////
  const handleOpenUserDetailsModal = (userDetails) => {
    console.log(userDetails);
    setSelectedUserDetails(userDetails);
    setShowUserDetailsModal(true);
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(searchTerm);
    setData(filteredData);
    console.log(filteredData);
  };

  const updateStatusactive = async (uid)=>{
    try{
      const res = await axios.patch(`http://localhost:5003/api/admin/Statusactive/${uid}`)
      console.log(res)
      if(res.data.status){
          console.log(res.data.status)
      }
    }catch(error){
      console.log("Error", error)
      
    }
  }

  const updateStatusdeactive = async (uid)=>{
    try{
      const res = await axios.patch(`http://localhost:5003/api/admin/Statusdeactive/${uid}`)
      console.log(res)
      if(res.data.status){
          console.log(res.data.status)
      }
    }catch(error){
      console.log("Error", error)
      
    }
  }

  const handleStatustoggle = async (uid,currentStatus)=>{
    if (currentStatus === 'active'){
      await updateStatusdeactive(uid)
    } else{
      await updateStatusactive(uid)
    }
  };



  return (
    <>
      <div className="px-5 py-3">
        <div className="d-flex justify-content-center">
          <h3>User List</h3>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Link to="/Adduser" className="btn btn-success">
            Add User
          </Link>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Image</th>
              <th className="text-center">Address</th>
              <th className="text-center">Qualification</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
              <th className="text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>{item.uid}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {" "}
                  <img
                    src={`http://localhost:5003/Image/${item.image}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    alt={item.image}
                  />
                </td>
                <td>{item.address}</td>
                <td>{item.qualification}</td>
                <td>
                  <Toggle
                    id={`status-toggle-${item.uid}`}
                    name="status"
                    defaultChecked={item.status === "active"}
                    onChange={()=>handleStatustoggle(item.uid,item.status)}
                  />
                  ;
                </td>
                <td>
                  <Link
                    className="btn btn-info btn-sm me-2"
                    variant="primary"
                    onClick={() => handleEditClick(item)}
                  >
                    <BiPencil />
                  </Link>
                  <Link
                    className="btn btn-info btn-sm me-2"
                    variant="primary"
                    onClick={() => handleOpenUserDetailsModal(item)}
                  >
                    <BiDetail />
                  </Link>
                </td>
                <td>
                  <RoleAssign prop={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
      </div>

      {/* update modal */}
      {selectedUser && (
        <Modal
          show={showEditModal}
          onHide={handleCloseEditModal}
          style={{ marginTop: "8vh" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="qualification" className="form-label">
                  Qualification
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="qualification"
                  name="qualification"
                  value={selectedUser.qualification}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      qualification: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={selectedUser.address}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              {/* Add other form fields for password, mobile, photo, etc. */}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={handleCloseEditModal}
            >
              Close
            </button>
            <button className="btn btn-primary" onClick={handleupdateUser}>
              Update
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {/* user details Modal*/}
      <Modal
        show={showUserDetailsModal}
        onHide={() => setShowUserDetailsModal(false)}
        style={{ marginTop: "7vh", border: "1px solid black", height:"100vh", }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", alignItems: "center" }}>
              {selectedUserDetails && (
                <img
                  src={`http://localhost:5003/Image/${selectedUserDetails.image}`}
                  alt="User"
                  style={{
                    marginRight: "10px",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              )}
              User : {selectedUserDetails?.name}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUserDetails && (
            <div className="div1" >
              <h3 style={{ fontWeight: "bold" }}>
                User ID:{selectedUserDetails.uid}{" "}
              </h3>
              {/* <p>Name: {selectedUserDetails.name}</p> */}
              <p>Email:{selectedUserDetails.email} </p>
              {/* <p>Qualification:{selectedUserDetails.qualification} </p> */}
              {/* <p>Address:{selectedUserDetails.address}</p> */}
              <p>mobile:{selectedUserDetails.mobile} </p>
              <p>status : {selectedUserDetails.status}</p>
              <p>
                date of joining:
                {moment(selectedUserDetails.doj).format("DD-MM-YYYY")}
              </p>
              <p>
                date of birth:
                {moment(selectedUserDetails.dob).format("DD-MM-YYYY")}
              </p>
              <p>pin :{selectedUserDetails.pin} </p>
              <p>State :{selectedUserDetails.state} </p>
              <p>City :{selectedUserDetails.city} </p>
              {/* Add other column */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUserDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* show Assign modal */}
    </>
  );
}

export default User;
