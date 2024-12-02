import { BrowserRouter, Routes, Route} from 'react-router-dom';
//import { useState } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import Market from './pages/Market';
import Forum from './pages/Forum';
import RentABoat from './pages/RentABoat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/market" element={<Market />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/rentaboat" element={<RentABoat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;