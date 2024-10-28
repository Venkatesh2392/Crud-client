import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(`Error while fetching users:`, error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error while deleting user:", error.message);
    }
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <Container className='mt-5'>
      <Row>
        <Col>
          <h1 className='text-center'>Dashboard</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.FirstName}</td>
                  <td>{user.LastName}</td>
                  <td>{user.email}</td>
                  <td>{user.Phone}</td>
                  <td>{user.Address}</td>
                  <td>{user.Gender}</td>
                  <td>
                    <Button variant='info' onClick={() => handleShowDetails(user)}>
                      View Details
                    </Button>{" "}
                    <Button variant='success' onClick={() => handleUpdate(user._id)}>
                      Update
                    </Button>{" "}
                    <Button variant='danger' onClick={() => handleDelete(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

     
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p><strong>First Name:</strong> {selectedUser.FirstName}</p>
              <p><strong>Last Name:</strong> {selectedUser.LastName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.Phone}</p>
              <p><strong>Address:</strong> {selectedUser.Address}</p>
              <p><strong>Gender:</strong> {selectedUser.Gender}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
