import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Home.css';
import NavBar from './../components/NavBar';

function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(true);
 
    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="site-container">
            <div className="content-container">
                {/* Navigation Bar */}
                <NavBar />

                {/* Main Content */}
                <main>
                <div style={{ marginTop: "0px" }} id="home">
                    <div className="header">
                        <h1 className="text-center mt-5 pt-5">Welcome to OceanBay<span>🌊</span></h1>
                        <p className="text-center">Explore our underwater world!</p>
                    </div>
                </div>
                {/* <div class="d-flex box1">
                    <img src={boat} class="left"/>
                    <div class="d-flex flex-column">
                        <h1> Buy, sell and trade!</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, molestias. Dicta expedita laudantium quia rem commodi. Ratione minus eveniet numquam nihil, natus magni doloribus temporibus dignissimos? Voluptates officiis quam pariatur.</p>
                    </div>
                </div> */}
                </main>

                {/* Popup Modal */}
                {isPopupVisible && (
                    <div className="popup-overlay">
                        <div className="popup-content bg-white p-4 rounded">
                            <button
                                type="button"
                                className="close-button"
                                onClick={closePopup}
                            >
                                <CloseIcon />
                            </button>
                            <center>
                                <h3> Welcome to 🌊 OceanBay!</h3>
                                <p>Explore our underwater world!</p>
                            </center>
                            <ul>
                                <li>
                                    Head over to the <a href="#Market">Market</a> and view or create Listings! 🏷️
                                </li>
                                <li>
                                    Visit the <a href="/Forum">Forum</a> and discuss with like-minded people! 🗣️
                                </li>
                                <li>
                                    You have any questions about the Blue and Circular economy? Travel to the <a href="/FAQ">FAQ</a> page! 📖
                                </li>
                                <li>
                                    Not yet a member? <a href="/Signup">Register</a> to become a part of our team! 🐬
                                </li>
                                <li>
                                    Learn about our mission at the <a href="#about">about</a> section. 🎯
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* About Section */}
                <div style={{ marginTop: "1000px" }} id="about">
                    <div className="header">
                        <h1>About</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium et incidunt molestiae ipsam. Et cumque tenetur est non odio provident? Tenetur quasi voluptatem eum eaque. Fugit minima quae est tempore.</p>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
