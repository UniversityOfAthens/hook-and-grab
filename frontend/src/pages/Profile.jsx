import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import pfp from '../assets/images/pfp.jpg';
import NavBar from './../components/NavBar';

function Profile() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.username);
        }
    }, []);

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="site-container">
            <div className="content-container">
                <NavBar />
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={6} className="text-center">
                            <h2>Profile</h2>
                            <Image src={pfp} roundedCircle className="mb-3" style={{ width: '100px', height: '100px' }}/>
                            <h5>Username: {username}</h5>
                            <Button variant="primary" onClick={handleGoBack} className="mt-3">Go back</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Profile;