import 'bootstrap/dist/css/bootstrap.min.css';
//import { useState } from 'react';
import Home from './Home';
import Profile from './Profile'; // Import Profile component
import Market from './Market';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;