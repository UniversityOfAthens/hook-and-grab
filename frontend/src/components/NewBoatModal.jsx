import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function NewBoatModal({ isOpen, onClose, onAddBoat }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [location, setLocation] = useState('');
    const [images, setImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('pricePerDay', parseFloat(pricePerDay));
        formData.append('location', location);
        formData.append('ownerId', user.id); // Include ownerId
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        axios.post('http://localhost:3482/boats', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true // Include credentials in the request
        })
        .then(response => {
            onAddBoat(response.data.boat);
            setSuccessMessage('Boat listed successfully');
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 2000); // Close the modal after 2 seconds
        })
        .catch(error => {
            console.error('Error creating boat listing:', error);
            setErrorMessage('Error creating boat listing. Please try again.');
        });
    };

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>List Your Boat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="pricePerDay" className="mt-3">
                        <Form.Label>Price Per Day</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price Per Day"
                            value={pricePerDay}
                            onChange={(e) => setPricePerDay(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="location" className="mt-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="images" className="mt-3">
                        <Form.Label>Images</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    {successMessage && <p className="text-success mt-2">{successMessage}</p>}
                    {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                    <Button type="submit" variant="primary" className="mt-3 w-100">
                        List Boat
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewBoatModal;