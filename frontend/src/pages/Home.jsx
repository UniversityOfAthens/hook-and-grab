import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Home.css';
import NavBar from './../components/NavBar';

import boat from "../assets/gifs/boat.gif";
import port from "../assets/gifs/port.gif";
import fishing from "../assets/gifs/fishing.gif";
import deutero  from "../assets/gifs/deutero.gif";

import hookIcon from '../assets/icons/hook.svg';


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
                        <h1 className="text-center mt-5 pt-5">Welcome to Hook&Grab
                        <span>
                            <img src={hookIcon} alt="Hook Icon" id="icon-title"/>
                        </span></h1>
                        <p className="text-center">Explore our underwater world!</p>
                    </div>
                </div>
                <div class="box1">
                    <img src={port} class="left"/>
                    <div class="textContainer">
                    <h1 class="textInside"> Buy, sell and trade!</h1>
                    <p class="textInside2">At the market, you can buy and sell used nautical products, spare parts and bait! Also try our trading feature, in which you exchange goods with fellow amateurs and professionals alike!</p>
                    </div>
                </div>
                
                <div class="box1">
                    <div class="textContainer">
                    <h1 class="textInside"> Rent a Boat!</h1>
                    <p class="textInside2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, molestias. Dicta expedita laudantium quia rem commodi. Ratione minus eveniet numquam nihil, natus magni doloribus temporibus dignissimos? Voluptates officiis quam pariatur.</p>
                    </div>
                    <img src={fishing} class="right"/>
                </div>

                <div class="box1">
                    <img src={deutero} class="left"/>
                    <div class="textContainer">
                    <h1 class="textInside"> Discuss in the Forums!</h1>
                    <p class="textInside2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, molestias. Dicta expedita laudantium quia rem commodi. Ratione minus eveniet numquam nihil, natus magni doloribus temporibus dignissimos? Voluptates officiis quam pariatur.</p>
                    </div>
                </div>

                <div class="box1">
                    <div class="textContainer">
                    <h1 class="textInside"> Have any questions?</h1>
                    <p class="textInside2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, molestias. Dicta expedita laudantium quia rem commodi. Ratione minus eveniet numquam nihil, natus magni doloribus temporibus dignissimos? Voluptates officiis quam pariatur.</p>
                    </div>
                    <img src={boat} class="right"/>
                </div>

                </main>

                {/* About Section */}
                <div style={{ marginTop: "3vh" }} id="about">
                    <div class="box1">
                    <div className="header">
                        <h1>About</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium et incidunt molestiae ipsam. Et cumque tenetur est non odio provident? Tenetur quasi voluptatem eum eaque. Fugit minima quae est tempore.</p>
                        </div>
                    </div>
                </div>	
            </div>
        </div>
    );
}

export default Home;