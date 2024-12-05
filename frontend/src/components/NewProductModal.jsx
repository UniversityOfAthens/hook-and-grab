import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NewProductModal.css';

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
        // Check if the user is authenticated by fetching the current user's profile
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
        formData.append('sellerId', user.id); // Include sellerId
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        axios.post('http://localhost:3482/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true // Include credentials in the request
        })
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
            setErrorMessage('Error creating product. Please try again.');
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>New Product</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Product Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <label>
                        <input
                            type="checkbox"
                            checked={isFree}
                            onChange={(e) => setIsFree(e.target.checked)}
                        />
                        Free
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={isOpenToTrade}
                            onChange={(e) => setIsOpenToTrade(e.target.checked)}
                        />
                        Open to Trade
                    </label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                    <button type="submit">Add Product</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default NewProductModal;