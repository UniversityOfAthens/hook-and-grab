import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginModal({ show, handleClose, handleShowSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = 'http://localhost:3482';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!username || !password) {
            setError('Please enter both username and password.');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });
            // Assuming response: { message: '...', user: {...} }
            localStorage.setItem('user', JSON.stringify(res.data.user));
            handleClose();
            if (window.location.pathname === '/') {
                window.location.reload();
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setUsername('');
        setPassword('');
        setError('');
        setLoading(false);
        handleClose();
    };

    const handleShowSignupModal = () => {
        handleCloseModal();
        handleShowSignup();
    }

    return (
        <Modal show={show} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
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
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <p className="text-danger mt-2">{error}</p>}
                    <Button type="submit" variant="primary" className="mt-3 w-100" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Log In'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={handleShowSignupModal} className="text-dark">
                    Don't have an account? Register
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
