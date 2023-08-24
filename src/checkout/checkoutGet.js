import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [checkout, setCheckout] = useState({ products: [] }); // Initialize products as an empty array

  useEffect(() => {
    fetch('https://insta-api-api.0vxq7h.easypanel.host/checkout')
      .then((response) => response.json())
      .then((data) => setCheckout(data))
      .catch((error) => console.error('Error fetch:', error));
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
      {checkout.products.map((product, index) => (
        <div key={index}>
          <img src={product.image} alt={product.name} />
          <p>Name: {product.name}</p>
          <p>Color: {product.color?.name}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: {product.price}</p>
          <p>Discounted Price: {product.discountedPrice}</p>
        </div>
      ))}
      <button><Link to={"/checkoutPost"}>Payer</Link></button>
    </div>
  );
}

export default Checkout;

