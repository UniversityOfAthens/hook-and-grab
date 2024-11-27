import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing user data)
        navigate('/login');
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Bluecopedia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#articles">Articles</Nav.Link>
                        <Nav.Link href="#about">About Us</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
                <div className="bg-white p-3 rounded w-25 text-center">
                    {/* Future logo will be placed here */}
                    <p>Welcome to Bluecopedia, get ready to learn</p>
                </div>
            </div>
        </div>
    );
}

export default Home;