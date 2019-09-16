import React from 'react'
import { Navbar, Button } from 'react-bootstrap'

const MainNavbar = ({ handleClick }) => (

  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>Fridventory</Navbar.Brand>
    <Button variant="light" size="sm" onClick={handleClick}>Add Item</Button>
  </Navbar>
)

export default MainNavbar
