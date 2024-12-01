import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupModal({ show, handleClose, handleShowLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation logic
        if (!username || !password) {
            setError('Please complete the form.');
            return;
        }

        axios
            .post('http://localhost:3482/auth/register', { username, password })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem(
                    'user',
                    JSON.stringify({ username: res.data.user.username })
                ); // Store user info in localStorage
                setError('');
                handleClose(); // Close the modal after successful signup
                navigate('/home'); // Redirect to home
            })
            .catch((err) => {
                console.log(err);
                setError(err.response?.data?.message || 'Registration failed. Please try again.');
            });
    };

    // Reset the form fields
    const handleReset = () => {
        setUsername('');
        setPassword('');
        setError('');
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
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {error && <p className="text-danger mt-2">{error}</p>}
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