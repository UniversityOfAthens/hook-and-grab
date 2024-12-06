import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupModal({ show, handleClose, handleShowLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = 'http://localhost:3482';

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required.';
        if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
        if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'A valid email is required.';
        if (!firstName) newErrors.firstName = 'First name is required.';
        if (!lastName) newErrors.lastName = 'Last name is required.';
        if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required.';
        if (!phone || !/^\d{10}$/.test(phone)) newErrors.phone = 'Phone must be a 10-digit number.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setLoading(false);
            setErrors(formErrors);
            return;
        }

        const userData = {
            username,
            password,
            email,
            firstName,
            lastName,
            dateOfBirth,
            phone,
        };

        try {
            const res = await axios.post(`${API_URL}/auth/register`, userData, { withCredentials: true });
            localStorage.setItem('user', JSON.stringify(res.data.user));
            handleClose();
            if (window.location.pathname === '/') {
                window.location.reload();
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ form: 'Registration failed. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setDateOfBirth('');
        setPhone('');
        setErrors({});
        setLoading(false);
    };

    const handleCloseModal = () => {
        handleReset();
        handleClose();
    };

    const handleShowLoginModal = () => {
        handleReset();
        handleShowLogin();
    };

    return (
        <Modal show={show} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            isInvalid={!!errors.username}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!errors.password}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!errors.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="firstName" className="mt-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            isInvalid={!!errors.firstName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="lastName" className="mt-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            isInvalid={!!errors.lastName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="dateOfBirth" className="mt-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            isInvalid={!!errors.dateOfBirth}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateOfBirth}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="phone" className="mt-3">
                        <Form.Label>Phone (10 digits)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            isInvalid={!!errors.phone}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {errors.form && <p className="text-danger mt-2">{errors.form}</p>}
                    <Button type="submit" variant="primary" className="mt-3 w-100" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleShowLoginModal} className="text-dark">
                    Already have an account? Log In
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignupModal;
