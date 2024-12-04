import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import pfp from '../assets/images/pfp.jpg';
import NavBar from './../components/NavBar';
import '../styles/Profile.css';

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
                <Container className="mt-0">
                    <Row className="justify-content-center">
                        <Col md={6} className="text-center">
                        <div style={{ marginTop: "15vh" }}>
                        <h1 className="text-center color-white mt-3 pt-3">Profile</h1>
                </div>
                            <Image src={pfp} roundedCircle className="mb-3" style={{ width: '100px', height: '100px' }}/>
                            <h5 className='color-white'>Username: {username}</h5>
                            <div className='container'>
                                <div className='box3'>
                                    <h5 className='text-white'>Bio: </h5>
                                    <p className='text-white'>(TBA)</p>
                                    <h5 className='text-white'>Location:</h5>
                                    <p className='text-white'>(TBA)</p>
                                </div>
                                <div className='box3'>
                                    <h5 className='text-white'>Friends: </h5>
                                    <p className='text-white'>(TBA)</p>
                                    <h5 className='text-white'>Posts:</h5>
                                    <p className='text-white'>(TBA)</p>
                                </div>
                                
                            </div>
                            <div className='container'>
                                <div className='box4'>
                                    <h5 className='text-white'>Purchases: </h5>
                                    <p className='text-white'>(TBA)</p>
                                    <h5 className='text-white'>Items Sold:</h5>
                                    <p className='text-white'>(TBA)</p>
                                    <h5 className='text-white'>Trades:</h5>
                                    <p className='text-white'>(TBA)</p>
                                </div>
                            </div>
                            <Button variant="primary" onClick={handleGoBack} className="button-style mt-3">Go back</Button>
                        </Col>
                    </Row>
                </Container>
                <p className='removeWhiteLineAtBottom'>_</p>
            </div>
        </div>
    );
}

export default Profile;