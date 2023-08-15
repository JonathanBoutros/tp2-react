import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./css/details.css"


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
      <div className="container mt-5">
          <div className="row">
              <div className="col-md-6 border border-secondary">
                  <img src={detail.image} alt={detail.name} className="img-fluid" />
              </div>
              <div className="col-md-6">
                  <h2>{detail.name}</h2>
                  <p className='row prix'><h3>{detail.price}</h3><span>$CA</span></p>
                  <p>Description: {detail.description}</p>
                  <p>Category: {detail.category?.name}</p>
                  <p>Color: {detail.color?.name}</p>
                  <input
                      type='number'
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="form-control mb-2 quantity"
                  />
                  <button
                      onClick={() => addToCart(detail.id, quantity)}
                      className="btn btn-danger mr-2"
                  >
                      Add to Cart
                  </button>
                  <button
                      onClick={() => addToWishlist(detail.id)}
                      className="btn btn-secondary"
                  >
                      Add to Wishlist
                  </button>
              </div>
          </div>
      </div>
    ); 

};

export default Details;