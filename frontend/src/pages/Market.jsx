import React, { useState, useEffect } from 'react';
import '../styles/Market.css';
import { FaList, FaTh, FaSearch } from 'react-icons/fa';
import NavBar from './../components/NavBar';
import axios from 'axios';
import NewProductModal from './../components/NewProductModal'; // Import the new modal component

const Market = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

    useEffect(() => {
        axios.get('http://localhost:3482/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const toggleView = () => {
        setIsGridView(!isGridView);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="site-container">
            <NavBar />
            <div className="content-container">
                <div className="market-container">
                    <header className="market-header">
                        <h1>Market</h1>
                        <div className="market-icons">
                            {isGridView ? (
                                <FaList className="market-icon" onClick={toggleView} />
                            ) : (
                                <FaTh className="market-icon" onClick={toggleView} />
                            )}
                        </div>
                    </header>
                    <section className="market-search">
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for items"
                                className="market-search-input"
                            />
                        </div>
                        <button className="market-search-button">Search</button>
                        {user && (
                            <button className="new-product-button" onClick={handleOpenModal}>New Product</button>
                        )}
                    </section>
                    <section className={`market-items ${isGridView ? 'grid-view' : 'list-view'}`}>
                        {products.map((product, index) => (
                            <div key={index} className="market-item">
                                <h2>{product.name}</h2>
                                <img src={product.image} alt={product.name} />
                                <p>{product.description}</p>
                                <p>{product.price.toFixed(2)}€</p>
                            </div>
                        ))}
                    </section>
                    <footer className="market-footer">
                        <p>&copy; 2024 Hook&Grab Marketplace. All rights reserved.</p>
                    </footer>
                </div>
            </div>
            <NewProductModal isOpen={isModalOpen} onClose={handleCloseModal} onAddProduct={handleAddProduct} />
        </div>
    );
};

export default Market;
