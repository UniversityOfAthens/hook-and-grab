import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
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
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation logic
        if (!username || !password || !email || !firstName || !lastName || !dateOfBirth || !phone) {
            setErrors({ form: 'Please complete the form.' });
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

        axios
            .post('http://localhost:3482/auth/register', userData)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem(
                    'user',
                    JSON.stringify({ username: res.data.user.username })
                ); // Store user info in localStorage
                setErrors({});
                handleClose(); // Close the modal after successful signup
                if (window.location.pathname === "/") {
                    window.location.reload();
                } else {
                    navigate('/'); // Redirect to home
                }
            })
            .catch((err) => {
                console.error('Error during registration:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                    console.error('Response status:', err.response.status);
                    console.error('Response headers:', err.response.headers);
                    setErrors(err.response.data.errors || { form: 'Registration failed. Please try again.' });
                } else if (err.request) {
                    console.error('Request data:', err.request);
                    setErrors({ form: 'No response received from the server. Please try again.' });
                } else {
                    console.error('Error message:', err.message);
                    setErrors({ form: 'An error occurred. Please try again.' });
                }
            });
    };

    // Reset the form fields
    const handleReset = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setDateOfBirth('');
        setPhone('');
        setErrors({});
    };

    // This function will be called when the modal is closed (either by clicking the close button or the backdrop)
    const handleCloseModal = () => {
        handleReset();  // Reset form fields
        handleClose();  // Close the modal
    };

    const handleShowLoginModal = () => {
        handleReset();      // Reset form fields
        handleShowLogin();  // Opens login modal
    }

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
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dateOfBirth}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="phone" className="mt-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {errors.form && <p className="text-danger mt-2">{errors.form}</p>}
                    <Button type="submit" variant="primary" className="mt-3 w-100">
                        Sign Up
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
