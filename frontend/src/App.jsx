import { BrowserRouter, Routes, Route} from 'react-router-dom';
//import { useState } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import Market from './pages/Market';
import Forum from './pages/Forum';
import RentABoat from './pages/RentABoat';
import Faq from './pages/Faq';
import Footer from './components/Footer';
import About from './pages/About';
function App() {
  return (
    <BrowserRouter>
    <div className="app-c">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/market" element={<Market />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/rentaboat" element={<RentABoat />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/about" element={<About />}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;