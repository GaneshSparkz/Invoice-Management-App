import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BiLayer } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Navbar.Brand>
            <BiLayer />&nbsp;
            Invoice Management App
          </Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          <Nav.Item>
            <Link className="nav-link" to={'/create'}>
              Create Invoice
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
