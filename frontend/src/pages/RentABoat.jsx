import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaList, FaTh, FaSearch } from 'react-icons/fa';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from './../components/NavBar';
import '../styles/RentABoat.css';
import axios from 'axios';
import NewBoatModal from './../components/NewBoatModal'; // Update to NewBoatModal
import filterIcon from '../assets/icons/filter.svg';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

function RentABoat() {
    const navigate = useNavigate();
    const [isGridView, setIsGridView] = useState(true);
    const [boats, setBoats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3482/boats')
            .then(response => {
                setBoats(response.data.boats);
            })
            .catch(error => {
                console.error('Error fetching boats:', error);
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

    const handleAddBoat = (newBoat) => {
        setBoats([...boats, newBoat]);
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="site-container">
            <div className="content-container">
                {/* Navigation Bar */}
                <NavBar />

                {/* Main Content */}
                <main>
                    <div style={{ marginTop: "0px" }} >
                        <div className="header">
                            <h1 className="text-center mt-5 pt-5">Rent A Boat</h1>
                            <p className="text-center">Save Resources, Empower Communities</p>
                            <div className="market-icons">
                                {isGridView ? (
                                    <FaList className="market-icon" onClick={toggleView} />
                                ) : (
                                    <FaTh className="market-icon" onClick={toggleView} />
                                )}
                            </div>
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
                            <button className="renting-your-boat-button" onClick={handleOpenModal}>Rent your Boat</button>
                        )}
                    </section>

                    <section className={`market-items ${isGridView ? 'grid-view' : 'list-view'}`}>
                        {boats.map((boat, index) => (
                            <div key={index} className="market-item">
                                <h2>{boat.title}</h2>
                                {boat.images && boat.images.length > 0 && (
                                    <img src={`data:image/jpeg;base64,${boat.images[0].data}`} alt={boat.title} />
                                )}
                                <p>{boat.description}</p>
                                <p>{boat.pricePerDay.toFixed(2)}€ per day</p>
                                <div className="market-item-buttons">
                                    <Button variant="primary" className="rent-button">
                                        Rent Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </section>
                    <footer className="renting-footer">
                        <p>&copy; 2024 Hook&Grab Rent A Boat. All rights reserved.</p>
                    </footer>
                </main>
            </div>
            <NewBoatModal isOpen={isModalOpen} onClose={handleCloseModal} onAddBoat={handleAddBoat} />
        </div>
    );
}

export default RentABoat;