import React, { useState, useEffect } from 'react';

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
        <div>
            <h1>Wishlist</h1>
            <div>
            <button onClick={removeAllWish}>Tout Effacer</button>
            {wishlists.map((wishlist) => (
                <div key={wishlist.id}>
                <img src={wishlist.image} alt={wishlist.name} />
                <p>name: {wishlist.name}</p>
                <p>Prix: {wishlist.price}$</p>
                <button onClick={() => removeFromWish(wishlist.id)}>Effacer</button>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Wishlist;