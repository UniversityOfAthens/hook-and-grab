import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardTab from '@mui/icons-material/KeyboardTab';
import './styles/custom.css';

function Home() {
    const navigate = useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username); // Retrieve username from local storage
            setIsPopupVisible(false);
        }
    }, []);

    const drawerContent = (
        <div className="drawer-content">
            <KeyboardTab className="drawer-close" onClick={toggleDrawer(false)} />
            <div className="drawer-header"></div>
            <Nav className="flex-column"> 
                <Nav.Link className="nav-link" href="#Market">Market</Nav.Link>
                <Nav.Link className="nav-link" href="#Forum">Forum</Nav.Link>
                <Nav.Link className="nav-link" href="#FAQ">FAQ</Nav.Link>
                <Nav.Link className="nav-link" href="#about">About</Nav.Link>
                {isLoggedIn ? (
                    <>
                        <Nav.Link className="nav-link" href="#profile">{username}</Nav.Link> 
                        <Nav.Link className="logout-link" onClick={handleLogout}>Log Out</Nav.Link>
                    </>
                ) : (
                    <Nav.Link className="nav-link" onClick={() => navigate('/login')}>Log In / Register</Nav.Link>
                )}
            </Nav>
        </div>
    );    

    return (
        <div className="site-container">
            <div className="content-container">
                <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand href="#home">🌊OceanBay</Navbar.Brand>
                        <div className="d-lg-none">
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon id="burger"/>
                            </IconButton>
                        </div>
                        <div className="d-none d-lg-flex">
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
                        </div>
                    </Container>
                </Navbar>

                <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                    {drawerContent}
                </Drawer>

                <main className="main-content">
                    <h1 className="text-center mt-5 pt-5">Welcome to OceanBay<span>🌊</span></h1>
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
                                <CloseIcon />
                            </button>
                            <center>
                                <h3> Welcome to 🌊 OceanBay!</h3>
                                <p>Explore our underwater world!</p>
                            </center>
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
                <div style={{ marginTop: "1000px" }} id="about">
                    <div class="header">
                        <h1>About</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium et incidunt molestiae ipsam. Et cumque tenetur est non odio provident? Tenetur quasi voluptatem eum eaque. Fugit minima quae est tempore.</p>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Home;