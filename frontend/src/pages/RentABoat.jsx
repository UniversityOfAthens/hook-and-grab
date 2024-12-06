import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaList, FaTh, FaSearch } from 'react-icons/fa';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from './../components/NavBar';
import '../styles/RentABoat.css';
import axios from 'axios';
import NewProductModal from './../components/NewProductModal';
import filterIcon from '../assets/icons/filter.svg';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

function RentABoat() {

    const handleGoBack = () => {
        navigate('/');
    };
    const [isGridView, setIsGridView] = useState(true);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    return(
        <div className="site-container">
            <div className="content-container">
                {/* Navigation Bar */}
                <NavBar />

                {/* Main Content */}
                <main>
                <div style={{ marginTop: "0px" }} >
                    <div className="header">
                    <div className="market-icons">
                        <div className="right-grid mt-5">
                            {isGridView ? (
                                <FaList className="market-icon" onClick={toggleView} />
                            ) : (
                                <FaTh className="market-icon" onClick={toggleView} />
                            )}
                        </div>
                        </div>
                        <h1 className="text-center mt-5 pt-5">Rent A Boat</h1>
                        <p className="text-center">Save Resources, Empower Communities</p>
                        
                    </div>
                </div>
                
                <section className="renting-search">
                <button className="rent-filter-button">
                                Filters <FilterAltIcon id="filter-icon" />
                            </button>
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for boats"
                                className="renting-search-input"
                            />
                        </div>
                        <button className="renting-search-button">Search</button>
                        {user && (
                            /* IMPORTANT!! THE CODE BELOW NEEDS TO CHANGE!! RIGHT NOW IT OPENS THE NEW PRODUCT POPUP. A NEW DATABASE NEEDS TO BE CREATED FOR THE NEW BOAT LISTINGS */
                            <button className="renting-your-boat-button" onClick={handleOpenModal}>Rent your Boat</button>
                        )}
                    </section>
                    {/* <section className={`market-items ${isGridView ? 'grid-view' : 'list-view'}`}>
                        {products.map((product, index) => (
                            <div key={index} className="market-item">
                                <h2>{product.name}</h2>
                                <img src={product.image} alt={product.name} />
                                <p>{product.description}</p>
                                <p>{product.price.toFixed(2)}€</p>
                            </div>
                        ))}
                    </section> */}

                

                </main>

            </div>
            <NewProductModal isOpen={isModalOpen} onClose={handleCloseModal} onAddProduct={handleAddProduct} />
        </div>
    )

}

export default RentABoat;
