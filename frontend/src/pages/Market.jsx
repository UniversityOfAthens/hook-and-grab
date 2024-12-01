import React, { useState } from 'react';
import '../styles/Market.css';
import { FaList, FaTh, FaSearch } from 'react-icons/fa'; // Import the FaSearch icon

const Market = () => {
    const [isGridView, setIsGridView] = useState(true); // State to toggle between Grid and List view

    const toggleView = () => {
        setIsGridView(!isGridView); // Swap between Grid and List view
    };

    return (
        <div className="market-container">
            <header className="market-header">
                <h1>Market Page</h1>
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
            </section>
            <section
                className={`market-items ${isGridView ? 'grid-view' : 'list-view'}`}
            >
                <div className="market-item">
                    <h2>Item 1</h2>
                    <p>Description of item 1.</p>
                </div>
                <div className="market-item">
                    <h2>Item 2</h2>
                    <p>Description of item 2.</p>
                </div>
                <div className="market-item">
                    <h2>Item 3</h2>
                    <p>Description of item 3.</p>
                </div>
            </section>
            <footer className="market-footer">
                <p>&copy; 2024 Hook&Grab Marketplace. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Market;
