import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Territories from './pages/Territories/Territories';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/territories' element={<Territories />} />
    </Routes>
    <Footer />
  </Router>
);