import { BrowserRouter, Routes, Route} from 'react-router-dom';
//import { useState } from 'react';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import Market from './pages/Market';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;