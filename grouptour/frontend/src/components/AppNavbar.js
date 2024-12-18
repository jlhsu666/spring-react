import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  try {
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand to="/" tag={Link}>
          Home
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">
                 Bootstrap
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/jlhsu666" target="_blank" rel="noopener noreferrer">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } catch (error) {
    console.error("Error in AppNavbar:", error);
    return <div>Error loading the Navbar</div>;
  }
};

export default AppNavbar;
