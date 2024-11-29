import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3482/auth/login', { username, password })
            .then(res => {
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify({ username: res.data.user.username })); // Store user info in localStorage
                navigate('/home');
            })
            .catch(err => {
                console.log(err);
                setError(err.response?.data?.message || 'Login failed. Please try again.');
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username">
                            <strong>Username</strong>
                        </label>
                        <input type="text"
                            placeholder="Enter Username"
                            autoComplete="off"
                            name="username"
                            className="form-control rounded-0"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </form>
                <p>Don't have an account?</p>
                <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;