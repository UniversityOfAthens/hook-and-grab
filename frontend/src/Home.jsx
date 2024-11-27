import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './styles/custom.css';


function Home() {
    const navigate = useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(true); // State for popup visibility

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing user data)
        navigate('/login');
    };

    const closePopup = () => {
        setIsPopupVisible(false); // Set popup visibility to false
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar className="custom-navbar" variant="dark" expand="lg">
                <Navbar.Brand href="#home" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '2rem' }}>🌊Bluecopedia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto">
        <Nav.Link href="#articles" className="text-light mx-3">
          Articles
        </Nav.Link>
        <Nav.Link href="#about" className="text-light mx-3">
          About Us
        </Nav.Link>
      </Nav>
      <Nav className="text-light ms-auto">
        <Nav.Link onClick={handleLogout}>Log In / Register</Nav.Link>
      </Nav>
    </Navbar.Collapse>
            </Navbar>

            {/* Popup */}
            {isPopupVisible && (
                <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
                    <div className="bg-white p-4 rounded w-30 text-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-10"
                            style={{
                                color: 'red',
                                backgroundColor: 'white',
                                float: 'right',
                            }}
                            onClick={closePopup} // Close popup on button click
                        >
                            X
                        </button>
                        {/* Popup Content */}
                        <h3>Welcome to 🌊 Bluecopedia, where everyone can learn!</h3>
                        <p>Nice to 'sea' you fellow user, here are some activities for you:</p>
                        <ul>
                            <li>
                                Head over to the <a href="#articles">articles</a> page and drown yourself with knowledge! 📖
                                (Switch to the Interactive Mode and start an adventure! 🗺️)
                            </li>
                            <li>
                            Not yet a member? <a href="/Signup">Register</a> to become a part of our team!
                            </li>
                            <li>
                            Learn about our mission at the <a href="#about">about</a> section. 🎯
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
