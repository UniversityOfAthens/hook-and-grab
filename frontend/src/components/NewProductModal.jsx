import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewProductModal.css';

const NewProductModal = ({ isOpen, onClose, onAddProduct }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { name, image, description, price: parseFloat(price) };
        axios.post('http://localhost:3482/products', newProduct)
            .then(response => {
                onAddProduct(response.data.product);
                setSuccessMessage('Product uploaded successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    onClose();
                }, 2000); // Close the modal after 2 seconds
            })
            .catch(error => {
                console.error('Error creating product:', error);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>New Product</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <button type="submit">Add Product</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default NewProductModal;