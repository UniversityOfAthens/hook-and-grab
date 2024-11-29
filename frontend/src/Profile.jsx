import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h2>Profile</h2>
                    <Image src="pfp.jpg" roundedCircle className="mb-3" />
                    <h5>Username: {username}</h5>
                    <Button variant="primary" onClick={handleGoBack} className="mt-3">Go back</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;