import{Container,Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./Header.css";

const Header=()=>{
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">CRUD_OP</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className='nav-link'>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/user">Post User</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
        </>
    );
};
export default Header;