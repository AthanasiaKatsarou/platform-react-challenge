import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/list" className="nav-link">
            Breeds
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
