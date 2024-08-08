import React, { useEffect, useState } from "react";
import "./addUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

function Adduser() {
  const [data, setData] = useState({
    uid: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    image: "",
    aadhar: "",
    doj: "",
    qualification: "",
    dob: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pin: "",
    countries: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await Country.getAllCountries();
        setCountries(countryData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const getAllStates = async () => {
      try {
        const states = await State.getStatesOfCountry("IN"); // 'IN' is the country code for India
        setStates(states);
      } catch (err) {
        console.log(err);
      }
    };

    getAllStates();
  }, []);

  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    setData({ ...data, state: selectedState });
  
    if (selectedState) {
      const countryCode = "IN";
      try {
        const stateCities = await City.getCitiesOfState(countryCode, selectedState);
        setCities(stateCities);
      } catch (err) {
        console.log(err);
      }
    } else {
      setCities([]);
    }
  };
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uid", data.uid);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image);
    formData.append("mobile", data.mobile);
    formData.append("aadhar", data.aadhar);
    formData.append("doj", data.doj);
    formData.append("qualification", data.qualification);
    formData.append("dob", data.dob);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("pin", data.pin);
     formData.append("countries", data.countries);
     if(data.email !== ''){
     try {
      const response = await axios.post(
        "http://localhost:5003/api/admin/postusers",
        formData
      );
      // Check if response status is OK (2xx) before navigating
      if (response.status >= 200 && response.status < 300) {
        navigate("/user");
        alert('Data successfully inserted');
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

  return (
    <>
      <div
        className="d-flex flex-column align-items-center pt-4  "
        style={{ boxShadow: "0 0 25px 0 #153448", marginTop: "35px",backgroundColor:"#F0F0F0" }}
        >
        <h2>Add Employee</h2>
        <form className="row g-1 w-40 bordered-form" onSubmit={handleSubmit}>
          <div className="col-4">
            <label htmlFor="inputid" className="form-label">
              Enter ID
            </label>
            <input
              type="text"
              className="form-control"
              id="inputuid"
              placeholder="Enter ID"
              autoComplete="off"
              onChange={(e) => setData({ ...data, uid: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputName" className="form-label">
              Enter Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Enter Name"
              autoComplete="off"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputEmail4" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputPassword4" className="form-label">
              Enter Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Enter Password"
              autoComplete="current-password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputMobile" className="form-label">
              Enter Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="inputMobile"
              placeholder="Enter Mobile"
              autoComplete="off"
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputGroupFile01" className="form-label">
              Select Photo
            </label>
            <input
              type="file"
              className="form-control"
              id="inputGroupFile01"
              placeholder="Enter Photo"
              autoComplete="off"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })} // Update 'image' field to the file object
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputAadhaar" className="form-label">
              Enter Aadhaar Number
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAadhaar"
              placeholder="Enter Aadhaar"
              autoComplete="off"
              onChange={(e) => setData({ ...data, aadhar: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputDob" className="form-label">
              Enter Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="inputDob"
              placeholder="Enter Date"
              autoComplete="off"
              onChange={(e) => setData({ ...data, dob: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputQualification" className="form-label">
              Enter Qualification
            </label>
            <input
              type="text"
              className="form-control"
              id="inputQualification"
              placeholder="Qualification"
              autoComplete="off"
              onChange={(e) =>
                setData({ ...data, qualification: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label htmlFor="inputDoj" className="form-label">
              Date of Joining
            </label>
            <input
              type="date"
              className="form-control"
              id="inputDoj"
              placeholder="Enter Date"
              autoComplete="off"
              onChange={(e) => setData({ ...data, doj: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputAddress" className="form-label">
              Enter Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Enter Address"
              autoComplete="off"
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>
          <div className="col-4">
            <label htmlFor="inputCountry" className="form-label">
              Select Country
            </label>
            <select
              className="form-select"
              id="inputCountry"
              value={data.countries}
              onChange={(e) => setData({ ...data, countries: e.target.value })}
            >
              <option value="">Select country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select
              className="form-select"
              id="inputState"
              value={data.state}
              onChange={handleStateChange}
            >
              <option value="">Select state</option>
              {states.map((item, index) => (
                <option key={index} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <select
  className="form-select"
  id="inputCity"
  value={data.city}
  onChange={(e) => setData({ ...data, city: e.target.value })} // Update city field with selected city
>
  <option value="">Select city</option>
  {cities.map((item, index) => (
    <option key={index} value={item.name}> {/* Use item.name as the value for the city */}
      {item.name}
    </option>
  ))}
</select>
          </div>
          <div className="col-4">
            <label htmlFor="inputPin" className="form-label">
              Enter Pin Code
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPin"
              placeholder="Enter Pin"
              autoComplete="off"
              onChange={(e) => setData({ ...data, pin: e.target.value })}
            />
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="btn btn-info">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Adduser;
