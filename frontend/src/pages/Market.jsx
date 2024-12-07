import React, { useState, useEffect } from 'react';
import '../styles/Market.css';
import { FaList, FaTh, FaSearch } from 'react-icons/fa';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavBar from './../components/NavBar';
import axios from 'axios';
import NewProductModal from './../components/NewProductModal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

const Market = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [currentMaxPrice, setCurrentMaxPrice] = useState(1000);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [includeFree, setIncludeFree] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3482/products')
            .then(response => {
                const fetchedProducts = response.data.products;
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);

                // Dynamically set max price based on the products
                const maxProductPrice = Math.max(...fetchedProducts.map(product => product.price));
                setMaxPrice(maxProductPrice);
                setCurrentMaxPrice(maxProductPrice);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        filterProducts(currentMaxPrice, includeFree, searchQuery);
    }, [searchQuery, currentMaxPrice, includeFree]);

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
        setFilteredProducts([...products, newProduct]);
        const maxProductPrice = Math.max(...products.map(product => product.price), newProduct.price);
        setMaxPrice(maxProductPrice);
        setCurrentMaxPrice(maxProductPrice);
    };

    const handleFilterToggle = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    const handleSortToggle = () => {
        setShowSortMenu(!showSortMenu);
    };

    const handleSort = (order) => {
        const sorted = [...filteredProducts].sort((a, b) =>
            order === 'asc' ? a.price - b.price : b.price - a.price
        );
        setFilteredProducts(sorted);
        setShowSortMenu(false); // Close the sort menu after sorting
    };

    const handlePriceChange = (newMaxPrice) => {
        setCurrentMaxPrice(newMaxPrice);
    };

    const handleFreeChange = (checked) => {
        setIncludeFree(checked);
    };

    const filterProducts = (max, free, query) => {
        const filtered = products.filter(product => {
            const inRange = product.price <= max;
            const isFree = free ? product.price === 0 : true;
            const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase()) ||
                                 product.description.toLowerCase().includes(query.toLowerCase());
            return inRange && isFree && matchesQuery;
        });
        setFilteredProducts(filtered);
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="site-container">
            <NavBar />
            <div className="content-container">
                <div className="market-container">
                    <header className="market-header">
                        <h1 className="text-center mt-5 pt-5">Market</h1>
                        
                    </header>
                    <section className="market-search">
                        <div className="sort-wrapper">
                            <button className="market-sort-button" onClick={handleSortToggle}>
                                Sort <SortIcon id="sort-icon" />
                            </button>
                            {showSortMenu && (
                                <div className="sort-menu">
                                    <button onClick={() => handleSort('asc')}>Price: Low to High</button>
                                    <button onClick={() => handleSort('desc')}>Price: High to Low</button>
                                </div>
                            )}
                        </div>
                        <div className="filter-wrapper">
                            <button className="market-filter-button" onClick={handleFilterToggle}>
                                Filters <FilterAltIcon id="filter-icon" />
                            </button>
                            {showFilterMenu && (
                                <div className="filter-menu">
                                    <div className="slider-container">
                                        <label htmlFor="max-price">Price Range: Up to {currentMaxPrice}€</label>
                                        <input
                                            id="max-price"
                                            type="range"
                                            min="0"
                                            max={maxPrice}
                                            value={currentMaxPrice}
                                            onChange={(e) => handlePriceChange(+e.target.value)}
                                        />
                                    </div>
                                    <div className="checkbox-container">
                                        <label>
                                            Include Free Items
                                            <input
                                                type="checkbox"
                                                checked={includeFree}
                                                onChange={(e) => handleFreeChange(e.target.checked)}
                                                id="free-checkbox"
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for items"
                                className="market-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {user && (
                            <button className="market-new-product-button" onClick={handleOpenModal}>
                                New Product <AddIcon id="add-icon" />
                            </button>
                        )}
                        <div className="market-icons">
                            {isGridView ? (
                                <FaList className="market-icon" onClick={toggleView} />
                            ) : (
                                <FaTh className="market-icon" onClick={toggleView} />
                            )}
                        </div>
                    </section>
                    <section className={`market-items ${isGridView ? 'grid-view' : 'list-view'}`}>
                        {filteredProducts.map((product, index) => (
                            <div key={index} className="market-item font2">
                                {user && user.id === product.sellerId && (
                                    <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                                        Delete
                                    </button>
                                )}
                                <h2>{product.title}</h2>
                                {product.images && product.images.length > 0 && (
                                    <img src={`data:${product.images[0].mimeType};base64,${product.images[0].data}`} alt={product.title} />
                                )}
                                <p>{product.description}</p>
                                <p>{(product.price || 0).toFixed(2)}€</p>
                                {user && user.id !== product.sellerId && (
                                <div className="market-item-buttons">
                                    <Button variant="primary" className="buy-button">
                                        {product.price === 0 ? 'Get for Free' : 'Buy Now'}
                                    </Button>
                                    <Button variant="secondary" className="trade-button">
                                        Trade
                                    </Button>    
                                </div>
                                )}
                            </div>
                        ))}
                    </section>
                </div>
            </div>
            <NewProductModal isOpen={isModalOpen} onClose={handleCloseModal} onAddProduct={handleAddProduct} />
        </div>
    );
};

export default Market;
