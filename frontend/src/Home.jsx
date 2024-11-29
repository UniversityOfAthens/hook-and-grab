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
    const [isPopupVisible, setIsPopupVisible] = useState(
        localStorage.getItem('popupDismissed') !== 'true'
    );
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
        localStorage.setItem('popupDismissed', 'true');
    };

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username);
            setIsPopupVisible(false);
        }
    }, []);

    const drawerContent = (
        <div className="drawer-content">
            <IconButton className="drawer-close" onClick={toggleDrawer(false)}>
                <KeyboardTab />
            </IconButton>
            <Nav className="flex-column">
                <Nav.Link onClick={() => navigate('/market')}>Market</Nav.Link>
                <Nav.Link onClick={() => navigate('/forum')}>Forum</Nav.Link>
                <Nav.Link onClick={() => navigate('/faq')}>FAQ</Nav.Link>
                <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
                {isLoggedIn ? (
                    <>
                        <Nav.Link onClick={() => navigate('/profile')}>{username}</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                    </>
                ) : (
                    <Nav.Link onClick={() => navigate('/login')}>Log In / Register</Nav.Link>
                )}
            </Nav>
        </div>
    );

    return (
        <div className="site-container">
            <div className="content-container">
                <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand onClick={() => navigate('/')}>🌊OceanBay</Navbar.Brand>
                        <div className="d-lg-none">
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon id="burger" />
                            </IconButton>
                        </div>
                        <div className="d-none d-lg-flex">
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => navigate('/market')}>Market</Nav.Link>
                                <Nav.Link onClick={() => navigate('/forum')}>Forum</Nav.Link>
                                <Nav.Link onClick={() => navigate('/faq')}>FAQ</Nav.Link>
                                <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
                            </Nav>
                            <Nav>
                                {isLoggedIn ? (
                                    <>
                                        <Nav.Link onClick={() => navigate('/profile')}>
                                            {username}
                                        </Nav.Link>
                                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                                    </>
                                ) : (
                                    <Nav.Link onClick={() => navigate('/login')}>
                                        Log In / Register
                                    </Nav.Link>
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
                                <h3>Welcome to 🌊 OceanBay!</h3>
                                <p>Explore our underwater world!</p>
                            </center>
                            <ul>
                                <li>
                                    Head over to the <a onClick={() => navigate('/market')}>Market</a> and view or create Listings! 🏷️
                                </li>
                                <li>
                                    Visit the <a onClick={() => navigate('/forum')}>Forum</a> and discuss with like-minded people! 🗣️
                                </li>
                                <li>
                                    You have any questions about the Blue and Circular economy? Travel to the <a onClick={() => navigate('/faq')}>FAQ</a> page! 📖
                                </li>
                                <li>
                                    Not yet a member? <a onClick={() => navigate('/signup')}>Register</a> to become a part of our team! 🐬
                                </li>
                                <li>
                                    Learn about our mission at the <a onClick={() => navigate('/about')}>about</a> section. 🎯
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                <div style={{ marginTop: "1000px" }} id="about">
                    <div className="header">
                        <h1>About</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium et incidunt molestiae ipsam. Et cumque tenetur est non odio provident? Tenetur quasi voluptatem eum eaque. Fugit minima quae est tempore.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
