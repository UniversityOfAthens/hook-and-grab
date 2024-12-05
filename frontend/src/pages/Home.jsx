import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Home.css';
import NavBar from './../components/NavBar';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import boat from "../assets/gifs/boat.gif";
import port from "../assets/gifs/port.gif";
import fishing from "../assets/gifs/fishing.gif";
import deutero  from "../assets/gifs/deutero.gif";

import hookIcon from '../assets/icons/hook.svg';


function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const navigate = useNavigate();

    const closePopup = () => {
        setIsPopupVisible(false);
    };
    
    const navigationButtons = {
        market: () => navigate('/market'),
        rentaboat: () => navigate('/rentaboat'),
        forum: () => navigate('/forum'),
        faq: () => navigate('/faq'),
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
                <div className="box1">
                    <img src={port} className="left"/>
                    <div className="textContainer">
                    <h1 className="textInside"> Buy, sell and trade!</h1>
                    <p className="textInside2">Discover a marketplace where marine resources get a second chance. From used boat parts to pre-loved fishing gear, every transaction helps extend the life of valuable materials, reduces waste, and supports coastal communities. It’s a win for you and the planet.</p>
                    <Button variant="primary" onClick={navigationButtons.market} className="button-style mt-3">Browse the Market</Button>
                    </div>
                </div>
                
                <div className="box1">
                    <div className="textContainer">
                    <h1 className="textInside"> Rent a Boat!</h1>
                    <p className="textInside2">Join the wave of sustainable marine travel. Whether you're exploring the seas or planning a local project, renting a boat helps reduce environmental impact while empowering coastal communities. Every rental supports a more resourceful, circular approach to marine life.</p>
                    <Button variant="primary" onClick={navigationButtons.rentaboat} className="button-style mt-3">Rent a Boat Now!</Button> 
                    </div>
                    <img src={fishing} className="right"/>
                </div>

                <div className="box1">
                    <img src={deutero} className="left"/>
                    <div className="textContainer">
                    <h1 className="textInside"> Discuss in the Forums!</h1>
                    <p className="textInside2">Join an interactive space where marine enthusiasts and professionals exchange ideas, troubleshoot challenges, and collaborate on solutions. Whether it’s sharing advice, exploring sustainable practices, or discussing industry trends, the forums are a hub for connection and innovation.</p>
                    <Button variant="primary" onClick={navigationButtons.forum} className="button-style mt-3">Join the Forums!</Button>
                    </div>
                </div>

                <div className="box1">
                    <div className="textContainer">
                    <h1 className="textInside"> Have any questions?</h1>
                    <p className="textInside2">Learn more about how we’re building a sustainable future for our oceans and communities. Whether you’re curious about the blue economy, the principles of circularity, or how our platform supports these goals, our FAQ page has the answers.</p>
                    <Button variant="primary" onClick={navigationButtons.faq} className="button-style mt-3">Take a look at the FAQ page!</Button>
                    </div>
                    <img src={boat} className="right"/>
                </div>

                </main>

                {/* About Section */}
                <div style={{ marginTop: "3vh", paddingBottom: "3vh", flex: 1 }} id="about">
                    <div className="box1">
                    <div className="header">
                        <h1>About</h1>
                        <p>At Hook&Grab, we’re reeling in a brighter future for our oceans and coastal communities. Rooted in the principles of the blue and circular economies, our mission is to create a platform where marine resources are reused, shared, and celebrated.</p>
                    </div>
                    </div>
                </div>	
            </div>
        </div>
    );
}

export default Home;