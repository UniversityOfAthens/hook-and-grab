import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardTab from '@mui/icons-material/KeyboardTab';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import './../styles/NavBar.css'

// Usage Instructions:
// 1. Wrap the NavBar component inside a parent container with `position: relative`.
//    This ensures that the NavBar is positioned correctly in the layout and any 
//    absolute/relative positioning inside the NavBar works as intended.
// 
// Example:
// <div className="site-container" style={{ position: 'relative' }}>
//   <NavBar />
//   {/* Additional content here */}
// </div>

function NavBar() {
    const navigate = useNavigate();

    // State Management
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    // Handlers
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleDrawer = (open) => () => setIsDrawerOpen(open);

    const handleShowSignup = () => {
        setIsLoginModalOpen(false);
        setIsSignupModalOpen(true);
    };

    const handleShowLogin = () => {
        setIsSignupModalOpen(false);
        setIsLoginModalOpen(true);
    };

    // Navigation Shortcuts
    const navigationLinks = {
        home: () => navigate('/home'),
        market: () => navigate('/market'),
        forum: () => navigate('/forum'),
        login: () => setIsLoginModalOpen(true),
        signup: () => setIsSignupModalOpen(true),
        profile: () => navigate('/profile'),
    };

    // User Authentication Status Check
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username);
        }
    }, []);

    // Drawer Content
    const drawerContent = (
        <div className="drawer-content">
            <KeyboardTab className="drawer-close" onClick={toggleDrawer(false)} />
            <Nav className="flex-column">
                <Nav.Link onClick={navigationLinks.market}>Market</Nav.Link>
                <Nav.Link href="#RentABoat">Rent a Boat</Nav.Link>
                <Nav.Link onClick={navigationLinks.forum}>Forum</Nav.Link>
                <Nav.Link href="#FAQ">FAQ</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                {isLoggedIn ? (
                    <>
                        <Nav.Link href="#profile">{username}</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                    </>
                ) : (
                    <Nav.Link onClick={navigationLinks.login}>Log In / Register</Nav.Link>
                )}
            </Nav>
        </div>
    );

    return (
        <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand onClick={navigationLinks.home}>🪝Hook&Grab</Navbar.Brand>

                {/* Mobile Menu */}
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

                {/* Desktop Menu */}
                <div className="d-none d-lg-flex">
                    <Nav className="me-auto">
                        <Nav.Link onClick={navigationLinks.market}>Market</Nav.Link>
                        <Nav.Link href="#RentABoat">Rent a Boat</Nav.Link>
                        <Nav.Link onClick={navigationLinks.forum}>Forum</Nav.Link>
                        <Nav.Link href="#FAQ">FAQ</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link onClick={navigationLinks.profile}>{username}</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link onClick={navigationLinks.login}>Log In</Nav.Link>
                                <Nav.Link onClick={navigationLinks.signup}>Sign Up</Nav.Link>
                            </>
                        )}
                    </Nav>
                </div>
            </Container>

            {/* Drawer */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent}
            </Drawer>

            {/* Login Modal */}
            <LoginModal
                show={isLoginModalOpen}
                handleClose={() => setIsLoginModalOpen(false)}
                handleShowSignup={handleShowSignup}
            />

            {/* Signup Modal */}
            <SignupModal
                show={isSignupModalOpen}
                handleClose={() => setIsSignupModalOpen(false)}
                handleShowLogin={handleShowLogin}
            />
        </Navbar>
    );
}

export default NavBar;
