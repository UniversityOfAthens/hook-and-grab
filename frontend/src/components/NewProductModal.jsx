import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/NewProductModal.css'; // Use the same CSS file as LoginModal

const NewProductModal = ({ isOpen, onClose, onAddProduct }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [isOpenToTrade, setIsOpenToTrade] = useState(false);
    const [images, setImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3482/users/me', { withCredentials: true })
            .then(response => {
                console.log('User is authenticated:', response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setErrorMessage('You must be logged in to create a product.');
            });
    }, []);

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', parseFloat(price));
        formData.append('isFree', isFree);
        formData.append('isOpenToTrade', isOpenToTrade);
        formData.append('sellerId', user.id);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        axios.post('http://localhost:3482/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        .then(response => {
            onAddProduct(response.data.product);
            setSuccessMessage('Product uploaded successfully');
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 2000);
        })
        .catch(error => {
            console.error('Error creating product:', error);
            setErrorMessage('Error creating product. Please try again.');
        });
    };

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="title">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Title"
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
                    <Form.Group controlId="price" className="mt-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="isFree" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Free"
                            checked={isFree}
                            onChange={(e) => setIsFree(e.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group controlId="isOpenToTrade" className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Open to Trade"
                            checked={isOpenToTrade}
                            onChange={(e) => setIsOpenToTrade(e.target.checked)}
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
                        Add Product
                    </Button>
                    <Button variant="secondary" onClick={onClose} className="mt-3 w-100">
                        Cancel
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewProductModal;