import React, { useState, useEffect } from 'react';
import './css/wishlist.css';

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([]);

  useEffect(() => {
    fetch('https://insta-api-api.0vxq7h.easypanel.host/wishlist')
      .then((response) => response.json())
      .then((data) => setWishlists(data))
      .catch((error) => console.error('Error fetch:', error));
  }, []);

  const removeFromWish = async (productId) => {
    try {
      const response = await fetch(`https://insta-api-api.0vxq7h.easypanel.host/wishlist/delete-product/${productId}`, {
        method: 'DELETE',
      });

      console.log('Cart item deleted:', response);

      window.location.reload();
    } catch (error) {
      console.error('Error delete product cart:', error);
    }
  };

  const removeAllWish = async () => {
    try {
      const response = await fetch('https://insta-api-api.0vxq7h.easypanel.host/wishlist/clear', {
        method: 'DELETE',
      });

      console.log('All cart item deleted:', response);

      window.location.reload();
    } catch (error) {
      console.error('Error delete all product cart:', error);
    }
  };

  return (
    <div className='container-fluid '>
      <div className='row d-flex flex-wrap wish-cont'>
        <div className='col-2 title-wrap'>
          <h1 className='wish-title'>Wishlist</h1>
        </div>
        <div className='col-10 wish-wrap'>
          <button className='btn-eff' onClick={removeAllWish}>Tout Effacer</button>
          <div className='row pl-5 pt-4'>

            {wishlists.map((wishlist) => (
              <div className='card wish-card col-lg-3 col-md-5 col-sm-11 my-3 mx-2' key={wishlist.id}>
                <img className='card-img-top img-wish' src={wishlist.image} alt={wishlist.name} />
                <div className='card-body wish-body'>
                  <p>{wishlist.name}</p>
                  <p>{wishlist.price}$</p>
                  <p className='border-wish mb-2'></p>
                  <p className='btn-dlt-wish' onClick={() => removeFromWish(wishlist.id)}>Effacer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;