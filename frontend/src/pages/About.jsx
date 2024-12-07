import React, { useState, useEffect } from 'react';
import NavBar from './../components/NavBar';
import '../styles/About.css'; 
function About(){
{/* About Section */}
return(
    <div className="about-container">
        <NavBar />
        <div className="box2">
        <div className="header">
            <h1>About</h1>
        </div>
        <div className="aboutText"><p>At Hook&Grab, we believe that sustainability starts with collaboration. By connecting individuals, businesses, and communities, we aim to tackle the challenges of resource scarcity and marine waste. Our platform isn't just a marketplace; it’s a movement toward a more circular way of living and working, where every item and resource has a chance to serve its purpose to the fullest.</p>
            <p>Our commitment goes beyond commerce. We empower users to trade, rent, and repurpose fishing gear, boats, and marine equipment, reducing the strain on our oceans and promoting resource efficiency. Every transaction on Hook&Grab represents a step toward reducing waste, preserving marine ecosystems, and supporting livelihoods tied to the sea.</p>
            <p>We envision a future where fishermen, boat owners, and marine enthusiasts don’t just coexist with the ocean but actively contribute to its health. Through knowledge-sharing, sustainable practices, and conscious choices, we aim to create a ripple effect of positive change that benefits both people and the planet.</p>
            <p>Whether you’re buying, selling, renting, or simply learning, Hook&Grab is your ally in building a community dedicated to protecting the waters we depend on. Together, we can turn the tide toward a sustainable, circular future for our blue planet.</p>
            <p>Join us in creating waves of change—because the ocean’s story is our story, and it’s worth preserving.</p>
            <p>Find us on Instagram: @hookandgrab</p>
            <p>Send us an Email: hookandgrab@gmail.com</p>
            </div>
        </div>
    </div>
    
    );
};

export default About;
