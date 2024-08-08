import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

function RoleAssign({ prop }) {
  console.log(prop.uid)
  const [selectedRole, setSelectedRole] = useState(""); // Initialize as empty string
  const [viewRole, setViewRole] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/admin/viewrole")
      .then((res) => setViewRole(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleAssignRole = () => {
    axios
      .post("http://localhost:5003/api/admin/roleassign/addadminroleassign", {
        uid: prop.uid,
        role_id: selectedRole,
      })
      .then((res) => {
      if(res.status===200){
        handleClose()
      };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//////////////////////

  const [showviewrole, setShowviewRole] = useState(false);

  const handleClose1 = () => setShowviewRole(false);
  const handleShow1 = () => {
    setShowviewRole(true)
    viewAssignedRoles()
  }
 


  //////////////view assigned roles ///////////
  const [assignedRoles, setAssignedRoles] = useState([])

    const viewAssignedRoles= () => {
       axios
       .get(`http://localhost:5003/api/admin/roleassign/getadminroleassign/${prop.uid}`)      
       .then((res) => setAssignedRoles(res.data))
      .catch((error) => console.log(error));
    }
  return (
    <div>
      <Button
        className="btn btn-info btn-sm me-2"
        variant="primary"
        onClick={handleShow}
      >
        <AssignmentIndOutlinedIcon/>
      </Button>
      <Button className="btn btn-info btn-sm me-2" variant="primary" onClick={handleShow1}>
        <VisibilityIcon />
      </Button>

      {/*  assign role Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role to</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Selected User Id: {prop.uid}</p>
          <p>Selected User: {prop.name}</p>
          <p>Selected Role:</p>
          <Form.Select
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole} // Corrected value assignment
          >
            <option>Select Role</option>
            {viewRole.map((item, index) => (
              <option key={index + 1} value={item.role_id}>
                {item.role_name}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssignRole}>
            Assign Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* view  role assign modal */}
      
      <Modal show={showviewrole} onHide={handleClose1} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Role name</th>
          <th>Revoke</th>
        </tr>
      </thead>
      
      <tbody>
      {
        assignedRoles.map((item,index) => (
          <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.role_name}</td>
          <td>
              <Button variant="danger" >
             <DeleteOutlineOutlinedIcon/>
             </Button>
          </td>
        </tr>
        ))
      }
        </tbody>
        </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default RoleAssign;
