import React from "react";
import  Navbar  from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../utils/mutations";
import pokeBowl from '../../assets/download.jpg'
import './nav.css'


const ResNavBar = () => {
  const [createOrder, {error: orderError, data: orderData}]= useMutation(CREATE_ORDER)
  if (Auth.loggedIn()) {
    return (
      <Navbar className="nav_container">
      <Container className="container">
      <Navbar.Brand href="">
        <img src={pokeBowl} />
        Project Poke</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/menu"onClick={()=> createOrder({})}>Menu</Nav.Link>
        <Nav.Link href="/login" onClick={() => Auth.logout()}>Logout</Nav.Link>
        <Nav.Link href="/order">Order</Nav.Link>
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
      <Navbar className="nav_container">
      <Container>
      <Navbar.Brand href="" ><img src={pokeBowl} />Project Poke</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/menu">Menu</Nav.Link>
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