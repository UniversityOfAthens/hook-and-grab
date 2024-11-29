import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './styles/custom.css';

function Home() {
    const navigate = useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username); // Ensure the correct key is used
            setIsPopupVisible(false);
        }
    }, []);

    return (
        <div className="site-container">
            <div className="content-container">
                <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand href="#home">🌊OceanBay</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#Market">Market</Nav.Link>
                                <Nav.Link href="#Forum">Forum</Nav.Link>
                                <Nav.Link href="#FAQ">FAQ</Nav.Link>
                                <Nav.Link href="#about">About</Nav.Link>
                            </Nav>
                            <Nav>
                                {isLoggedIn ? (
                                    <>
                                        <Nav.Link href="#profile">{username}</Nav.Link>
                                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                                    </>
                                ) : (
                                    <Nav.Link onClick={() => navigate('/login')}>Log In / Register</Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <main className="main-content">
                    <h1 className="text-center mt-5 pt-5">Welcome to OceanBay<span style={{transform:'scaleX(-1)'}}>🌊</span></h1>
                    <p className="text-center">Explore our underwater world!</p>
                </main>

                {isPopupVisible && (
                    <div className="popup-overlay">
                        <div className="popup-content bg-white p-4 rounded">
                            <button
                                type="button"
                                className="close-button"
                                onClick={closePopup}
                            >
                                X
                            </button>
                            <h3> <center>Welcome to 🌊 OceanBay! </center></h3>
                            <p> <center>Explore our underwater world!</center> </p>
                            <ul>
                                <li>
                                    Head over to the <a href="#Market">Market</a> and view or create Listings! 🏷️
                                </li>
                                <li>
                                    Visit the <a href="/Forum">Forum</a> and discuss with like-minded people! 🗣️
                                </li>
                                <li>
                                    You have any questions about the Blue and Circular economy? Travel to the <a href="/FAQ">FAQ</a> page! 📖
                                </li>
                                <li>
                                    Not yet a member? <a href="/Signup">Register</a> to become a part of our team! 🐬
                                </li>
                                <li>
                                    Learn about our mission at the <a href="#about">about</a> section. 🎯
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
