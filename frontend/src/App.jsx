import 'bootstrap/dist/css/bootstrap.min.css';
//import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Profile from './Profile'; // Import Profile component
import Market from './Market';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

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