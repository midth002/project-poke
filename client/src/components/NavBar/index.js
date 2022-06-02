import React from "react";
import  Navbar  from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Auth from "../../utils/auth";


const ResNavBar = () => {
  if (Auth.loggedIn()) {
    return (
      <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="">Project Poke</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/menu">Menu</Nav.Link>
        
        <Nav.Link href="/login" onClick={() => Auth.logout()}>Logout</Nav.Link>
      {/* {data ? (
        <Nav.Link href="/order">Current Order</Nav.Link>
      ):(
        null
      )} */}
      </Nav>
      </Container>
    </Navbar>
  )
  } else {
    return (
      <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="">Project Poke</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/menu">Menu</Nav.Link>
        <Nav.Link href="/order">Order</Nav.Link>
        <Nav.Link href="/login" >Login</Nav.Link>
      {/* {data ? (
        <Nav.Link href="/order">Current Order</Nav.Link>
      ):(
        null
      )} */}
      </Nav>
      </Container>
    </Navbar>
  )
  }
    
}

export default ResNavBar;