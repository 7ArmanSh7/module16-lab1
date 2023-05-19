import React from 'react'
import Contents from './Contents.jsx';
import { Nav, Navbar } from 'react-bootstrap';


function NavBar(){
    return(
        <Navbar bg="dark" variant='dark'>
            <Navbar.Brand href='/'>Employee Management application</Navbar.Brand>
            <Nav>
            <Nav.Link href='/employee'>All Employees</Nav.Link>
            <Nav.Link href='/report'>Report</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default function Page(){
    return(
        <div>
            <NavBar/>
            <Contents/>
        </div>
    )
}