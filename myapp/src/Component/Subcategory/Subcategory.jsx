import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./subcategory.css";
import axios from "axios";
import UpdateSubcategory from "./UpdateSubcategory";
import moment from "moment";
// import Button from 'react-bootstrap/Button';
import { Pagination } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';

function Subcategory() {
  useEffect(() => {
    viewcategory();
    view_sub_category();
  }, []);

  // get sub category

  const [Subcategory, setSubcategory] = useState([]);
  async function view_sub_category() {
    axios
      .get("http://localhost:5003/api/admin/subcategory/view_sub_category")
      .then((result) => {
        console.log(result);
        setSubcategory(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // post api

  //  view category
  const [category, setCategory] = useState([]);
  async function viewcategory() {
    axios
      .get("http://localhost:5003/api/admin/subcategory/viewcategory")
      .then((result) => {
        console.log(result);
        setCategory(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // post api
  const [data, setData] = useState({
    cid: "",
    subcategory_id: "",
    subcategory_name: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cid", data.cid);
    formData.append("subcategory_id", data.subcategory_id);
    formData.append("subcategory_name", data.subcategory_name);
    formData.append("image", data.image);

    if (data.subcategory_id !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5003/api/admin/subcategory/addsubcategory",
          formData
        );
        if (response.status >= 200 && response.status < 300) {
          alert("Data added successfully!");
          view_sub_category();
          setData();
        } else {
          console.log("Server error:", response.statusText);
        }
      } catch (error) {
        console.log(("Error", error.message));
      }
    }
  };

  // const [searchTerm, setSearchTerm] = useState("");
  // const handleSearch = () => {
  //   const filteredData = data.filter((item) =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   console.log(searchTerm);
  //   setData(filteredData);
  //   console.log(filteredData);
  // };

  const [currentPage, setCurrentPage] = useState(1); // pagination
  const itemsPerPage = 4; //pagination
  ////pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = Subcategory.slice(startIndex, endIndex);
  const totalPages = Math.ceil(Subcategory.length / itemsPerPage);
  // Pagination

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mt-1">
          <div className="Subcategory">
            <Form onSubmit={handleSubmit}>
              <h4>Add New Sub Category</h4>
              <br />
              <Form.Group controlId="Category">
                <Form.Label>
                  <h6>Select Category Id</h6>
                </Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setData({ ...data, cid: e.target.value })}
                >
                  {category.map((cat) => (
                    <option value={cat.cid}>{cat.cname}</option>
                  ))}
                </Form.Control>
                <div className="text-danger"></div>
              </Form.Group>
              <br />
              <Form.Group controlId="subCategoryId">
                <Form.Label>
                  <h6>SubCategory Id</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter SubCategory Id"
                  onChange={(e) =>
                    setData({ ...data, subcategory_id: e.target.value })
                  }
                />
                <div className="text-danger"></div>
              </Form.Group>
              <br />
              <Form.Group controlId="subCategoryName">
                <Form.Label>
                  <h6>SubCategory Name</h6>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter SubCategory Name"
                  onChange={(e) =>
                    setData({ ...data, subcategory_name: e.target.value })
                  }
                />
                <div className="text-danger"></div>
              </Form.Group>
              <br />
              <Form.Group controlId="photo">
                <Form.Label>
                  <h6>Photo</h6>
                </Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Upload Photo"
                  onChange={(e) =>
                    setData({ ...data, image: e.target.files[0] })
                  }
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
        <div className="col-lg-6 mt-1 box-shadow: inherit">
          <div className="table-responsive">
            <h4>SubCategory List</h4>
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name"
              />
              <button className="btn btn-primary"><SearchIcon/></button>
            </div>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">Product Category Id</th>
                  <th className="text-center">Sub Category Id</th>
                  <th className="text-center">Sub Category Name</th>
                  <th className="text-center">Photo</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((d, index) => (
                  <tr key={index}>
                    <td>{d.cid}</td>
                    <td>{d.subcategory_id}</td>
                    <td>{d.subcategory_name}</td>
                    <td>
                      {" "}
                      <img
                        src={`http://localhost:5003/Image/${d.image}`}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />{" "}
                    </td>
                    <td>{moment(d.addon).format("DD-MM-YYYY")}</td>
                    <td>
                      <UpdateSubcategory props={d.subcategory_id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* pagination */}
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

            {/* end pagination */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subcategory;
