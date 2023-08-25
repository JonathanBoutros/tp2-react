import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/cart.css';

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
    <div className='container-fluid '>
      <div className='row d-flex flex-wrap wish-cont '>
        <div className='col-2 cart-title-wrap'>
          <h1 className='cart-title'>Cart</h1>
        </div>


        <div className='col-10 wish-wrap'>
          <button className='btn-eff' onClick={removeAll}>Tout Effacer</button>
          <div className='row pl-5 pt-4'>

            {cart.map((item) => (

              <div className='card wish-card col-lg-3 col-md-5 col-sm-11 my-3 mx-2' key={item.id}>
                <img className='card-img-top img-wish' src={item.image} alt={item.name} />

                <div className='card-body wish-body'>
                  <p>{item.name}</p>
                  <p>{item.price}$</p>

                  <label htmlFor='quantite'>Quantité:</label>
                  <input
                    className='input-qte'
                    type='number'
                    value={item.quantity}
                    onChange={(e) => modify(item.id, parseInt(e.target.value))}
                  />

                  <button className='btn-effacer' onClick={() => removeFromCart(item.id)}>Annuler</button>
                  <p className='border-wish mb-2'></p>

                  <button className='btn-payer'><Link to={"/checkout"}>Payer</Link></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button><Link to={"/checkout"}>Payer</Link></button>
    </div>
  );
};

export default Cart;
