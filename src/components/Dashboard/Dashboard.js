import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate ();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user`);
      const data = await response.json();
      setUsers(data)
    } catch (error) {
      console.error(`error while fetchig users:`, error.message);
    }
  }

  useEffect(() => {
   
    fetchUsers();
  }, []);

const handleUpdate = (userId) =>{
navigate(`/user/${userId}`);
}

const handleDelete = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
      method : "DELETE"
    });
    console.log(response);
    if(response.ok){
      fetchUsers();
    }
   
  } catch (error) {
    console.error("error while deleting user:", error.message);
  }
  
}
  return (
    <>
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
                      <Button
                        variant='success'
                        onClick={() => handleUpdate(user._id)}
                      >
                        Update
                      </Button>{" "}
                      <Button
                        variant='danger'
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard