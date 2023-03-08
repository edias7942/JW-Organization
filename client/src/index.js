import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './index.css';

import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <NavBar />
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  </Router>
);