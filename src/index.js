import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './produit.js';
import Details from './details.js';
import Nav from './navbar.js';
import Cart from './cart.js';
import Wishlist from './wishlist.js';
import Historique from './historique.js';
import CafeList from './cafe.js';
import AddCafe from './createCafe.js';

const App = () => {
  return (
    <Router>
      <div>
        <nav><Nav /></nav>
        <Routes>
          <Route path="createCafe" element={<AddCafe />} />
          <Route path="cafe" element={<CafeList />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />}/>
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/historique" element={<Historique />} />
        </Routes>
      </div>
    </Router>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


