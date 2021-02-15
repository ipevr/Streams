import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/">
        <Navbar.Brand>Streamingo</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Link to="/" className="nav-link active">
            <Nav.Item>All Streams</Nav.Item>
          </Link>
          <GoogleAuth />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
