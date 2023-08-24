import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://insta-api-api.0vxq7h.easypanel.host/cart')
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error('Error fetch:', error));
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`https://insta-api-api.0vxq7h.easypanel.host/cart/remove-product/${productId}`, {
        method: 'DELETE',
      });

      console.log('Cart item deleted:', response);

      window.location.reload();
    } catch (error) {
      console.error('Error delete product cart:', error);
    }
  };

  const removeAll = async () => {
    try {
      const response = await fetch('https://insta-api-api.0vxq7h.easypanel.host/cart/clear', {
        method: 'DELETE',
      });

      console.log('All cart item deleted:', response);

      window.location.reload();
    } catch (error) {
      console.error('Error delete all product cart:', error);
    }
  };

  const modify = async (productId, newQuantity) => {
    try {
      const response = await fetch(`https://insta-api-api.0vxq7h.easypanel.host/cart/modify-product-quantity/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      console.log('Modified quantity:', response);

      window.location.reload();
    } catch (error) {
      console.error('Error modify:', error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        <button onClick={removeAll}>Tout Effacer</button>
        {cart.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            <p>Nom: {item.name}</p>
            <p>Prix: {item.price}$</p>
            <label htmlFor='quantite'>Quantité:</label>
            <input
              type='number'
              value={item.quantity}
              onChange={(e) => modify(item.id, parseInt(e.target.value))}
            />
            <button onClick={() => removeFromCart(item.id)}>Effacer</button>
          </div>
        ))}
      </div>
      <button><Link to={"/checkout"}>Payer</Link></button>
    </div>
  );
};

export default Cart;
