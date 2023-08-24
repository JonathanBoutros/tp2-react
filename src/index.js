import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/global-style.css';
import ProductList from './pageProduct/produit';
import Details from './pageDetail/details';
import Nav from './navbar';
import Cart from './cart';
import Wishlist from './wishlist';
import Historique from './historique';
import CafeList from './pageCafe/cafe';
import AddCafe from './pageCafe/createCafe';
import Checkout from './checkout/checkoutGet';
import PostCheckout from './checkout/checkoutPost';

const App = () => {
  return (
    <Router>
      <div>
        <nav><Nav /></nav>
        <Routes>
          <Route path="/checkoutPost" element={<PostCheckout/>} />
          <Route path="/checkoutGet" element={<Checkout />} />
          <Route path="/createCafe" element={<AddCafe />} />
          <Route path="cafe" element={<CafeList />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
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
    <App />
  </React.StrictMode>
);


