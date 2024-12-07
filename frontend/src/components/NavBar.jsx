import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardTab from '@mui/icons-material/KeyboardTab';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import './../styles/NavBar.css';
import hookIcon from './../assets/icons/hook.svg';

function NavBar() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsLoggedIn(true);
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
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

    const navigationLinks = {
        home: () => navigate('/'),
        market: () => navigate('/market'),
        rentaboat: () => navigate('/rentaboat'),
        forum: () => navigate('/forum'),
        faq: () => navigate('/faq'),
        profile: () => navigate('/profile'),
        about: () => navigate('/about')
    };

    const drawerContent = (
        <div className="drawer-content">
            <KeyboardTab className="drawer-close" onClick={toggleDrawer(false)} />
            <Nav className="flex-column">
                <Nav.Link onClick={navigationLinks.market}>Market</Nav.Link>
                <Nav.Link onClick={navigationLinks.rentaboat}>Rent a Boat</Nav.Link>
                <Nav.Link onClick={navigationLinks.forum}>Forum</Nav.Link>
                <Nav.Link onClick={navigationLinks.faq}>FAQ</Nav.Link>
                <Nav.Link onClick={navigationLinks.about}>About</Nav.Link>
                {isLoggedIn ? (
                    <>
                        <Nav.Link onClick={navigationLinks.profile}>{user?.username || 'Profile'}</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                    </>
                ) : (
                    <Nav.Link onClick={() => setIsLoginModalOpen(true)}>Account</Nav.Link>
                )}
            </Nav>
        </div>
    );

    return (
        <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand onClick={navigationLinks.home} style={{ cursor: 'pointer' }}>
                    Hook&Grab
                    <img src={hookIcon} alt="Hook&Grab" id="icon-brand" />
                </Navbar.Brand>

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
                <div className="d-none d-lg-flex w-100 justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link onClick={navigationLinks.market}>Market</Nav.Link>
                        <Nav.Link onClick={navigationLinks.rentaboat}>Rent a Boat</Nav.Link>
                        <Nav.Link onClick={navigationLinks.forum}>Forum</Nav.Link>
                        <Nav.Link onClick={navigationLinks.faq}>FAQ</Nav.Link>
                        <Nav.Link onClick={navigationLinks.about}>About</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={isLoggedIn ? (user?.username || 'Account') : 'Account'} id="account-dropdown" align="end">
                            {isLoggedIn ? (
                                <>
                                    <NavDropdown.Item onClick={navigationLinks.profile} className="no-text-shadow">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout} className="no-text-shadow">Log Out</NavDropdown.Item>
                                </>
                            ) : (
                                <>
                                    <NavDropdown.Item onClick={handleShowLogin} className="no-text-shadow">Log In</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleShowSignup} className="no-text-shadow">Sign Up</NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
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
