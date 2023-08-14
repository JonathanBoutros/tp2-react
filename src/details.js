import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Details = () => {
    const [detail, setDetail] = useState([]);
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const quantityChange = parseInt(event.target.value)
      setQuantity(quantityChange);
  };

    useEffect(() => {
        fetch(`https://insta-api-api.0vxq7h.easypanel.host/products/${id}`)
        .then((response) => response.json())
        .then((data) => setDetail(data))
        .catch((error) => console.error('Error fetch:', error));
    }, [id]);

    const addToCart = async (productId, quantity) => {
        try {
          const response = await fetch('https://insta-api-api.0vxq7h.easypanel.host/cart/add-product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
          });
    
          const data = await response.json();
          console.log('Product ajouter:', data);
        } catch (error) {
          console.error('Error ajout cart:', error);
        }
      };

  const addToWishlist = async (productId) => {
    try {
      const response = await fetch('https://insta-api-api.0vxq7h.easypanel.host/wishlist/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
        
        const data = await response.json();
        console.log('Product ajouter:', data);
      } catch (error) {
        console.error('Error ajout wishlist:', error);
      }
    };
  
    return(
        <div>
            <img src={detail.image} alt={detail.name} />
            <p>{detail.name}</p>
            <p>{detail.price}$</p>
            <p>{detail.description}</p>
            <p>{detail.category?.name}</p>
            <p>{detail.color?.name}</p>
            <input type='number' min="1" value={quantity} onChange={handleQuantityChange} />
            <button onClick={() => addToCart(detail.id, quantity)}>Ajouter au Cart</button>
            <button onClick={() => addToWishlist(detail.id )}>Ajouter a la wishlist</button>
        </div>
        //commentaire
    ); 
};

export default Details;