import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './PostUser.css';

const PostUser = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    Phone: "",
    Address: "",
    Gender: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://crud-server-4jps.onrender.com/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="center-form">
      <h1>Add New User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            placeholder="Enter First Name"
            value={formData.FirstName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            placeholder="Enter Last Name"
            value={formData.LastName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            name="Phone"
            placeholder="Enter Phone No"
            value={formData.Phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            name="Address"
            placeholder="Enter Address"
            value={formData.Address}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label>Gender:</Form.Label>
          <Form.Control
            as="select"
            name="Gender"
            value={formData.Gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>

        <Button variant='dark' type="submit" className="w-100">Add User</Button>
      </Form>
    </div>
  );
};

export default PostUser;
