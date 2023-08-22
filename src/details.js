import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./css/details.css"


const Details = () => {
    const [detail, setDetail] = useState([]);
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [text, setText] = useState("");
    const [cart, setCart] = useState([]);
    const [wish, setWish] = useState([]);
    const [sold, setSold] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [commentValue, setCommentValue] = useState("");
    const [error, setError] = useState("");

  const handleQuantityChange = (event) => {
    const quantityChange = parseInt(event.target.value)
      setQuantity(quantityChange);
  };

  const handleComment = (event) => {
    const comment = (event.target.value)
      setCommentValue(comment);
  };

    useEffect(() => {
      fetch( 'https://insta-api-api.0vxq7h.easypanel.host/promotions')
      .then((response) => response.json())
      .then((data) => setSold(data))
      .catch((error) => console.error('Error fetch:', error));
    }, [id]);

    useEffect(() => {
        fetch(`https://insta-api-api.0vxq7h.easypanel.host/products/${id}`)
        .then((response) => response.json())
        .then((data) => setDetail(data))
        .catch((error) => console.error('Error fetch:', error));
    }, [id]);

    useEffect(() => {
      fetch('https://insta-api-api.0vxq7h.easypanel.host/wishlist')
      .then((response) => response.json())
      .then((data) => setWish(data))
      .catch((error) => console.error('Error fetch:', error));
  }, []);

    useEffect(() => {
      fetch('https://insta-api-api.0vxq7h.easypanel.host/cart')
        .then((response) => response.json())
        .then((data) => setCart(data))
        .catch((error) => console.error('Error fetch:', error));
    }, []);

    useEffect(() => {
      fetch(`https://insta-api-api.0vxq7h.easypanel.host/comments?productId=${id}`)
        .then((response) => response.json())
        .then((data) => setAllComments(data))
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

    const addComment = async () => {
      if (!commentValue) {
        setError('Le commentaire ne peut pas être vide.');
        return;
      }
  
      try {
        const response = await fetch('https://insta-api-api.0vxq7h.easypanel.host/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: commentValue, productId: detail.id }),
        });
    
        if (response.ok) {
          window.location.reload();
          const data = await response.json();
          console.log('Comment added:', data);
        } 
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
    

      const deleteComment = async (commentId) => {
        try {
          const response = await fetch(`https://insta-api-api.0vxq7h.easypanel.host/comments/${commentId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            window.location.reload();
            console.log('Comment deleted');
          } else {
            setError("tu ne peux pas effecer un commentaire qui n'est pas le tien")
          }
        } catch (error) {
          
          console.error('Error deleting comment:', error);
        }
      };

    const popUpCart = () => {
      addToCart(detail.id, quantity);
      setText("ajout reussi au cart");
      window.location.reload();
    }

    const popUpWish = () => {
      addToWishlist(detail.id);
      setText("ajout reussi a la Wishlist");
      window.location.reload();
    }
  
    const enSold = () => {
      const soldProduct = sold.find(item => item.id === detail.id);
  
      return (
        <div>
          {soldProduct ? (
            <p>en sold: {soldProduct.discountPercent * 100}%</p>
          ) : (
            <p></p>
          )}
        </div>
      );
    };

    const cartPresent = () => {
      const isProductInCart = cart.some(item => item.id === detail.id);

      return (
        <div>
          {isProductInCart ? (
            <p>Ce produit est dans votre panier.</p>
          ) : (
            <p>Ce produit n'est pas dans votre panier.</p>
          )}
        </div>
      );
    }

    const wishPresent = () => {
      const isProductInCart = wish.some(item => item.id === detail.id);

      return (
        <div>
          {isProductInCart ? (
            <p>Ce produit est dans votre Wishlist.</p>
          ) : (
            <p>Ce produit n'est pas dans votre Wishlist.</p>
          )}
        </div>
      );
    }

    setTimeout(() => {
      setError("");
    }, 10000)
    
    setTimeout(() => {
      setText("");
    }, 3000)
    
  
    return(
      <div className="container mt-5">
          <div className="row">
              <div className="col-md-6 border border-secondary">
                  <img src={detail.image} alt={detail.name} className="img-fluid" />
              </div>
              <div className="col-md-6">
                  <h2>{detail.name}</h2>
                  <p className='row prix'><h3>{detail.price}</h3><span>$CA</span></p>
                  <div>{enSold(detail.id)}</div>
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
                      onClick={popUpCart}
                      className="btn btn-danger mr-2"
                  >
                      Add to Cart
                  </button>
                  <p>{cartPresent(detail.id)}</p>
                  <button
                      onClick={popUpWish}
                      className="btn btn-secondary"
                  >
                      Add to Wishlist
                  </button>
                  <p>{wishPresent(detail.id)}</p>
              </div>
              <div>
          <h3>Section Commentaire</h3>
          <label htmlFor="commentInput">Commentaire:</label>
          <br></br>
          <input
            type="text"
            value={commentValue}
            placeholder='Ajouter un commentaire...'
            onChange={handleComment}
          />
          <button onClick={addComment}>Submit</button>
          <div>
            {allComments.map((comment) => (
              <div className="col-sm-4" key={comment.id}>
                <p>{comment.content}
                  <button onClick={() => deleteComment(comment.id)}>
                    Delete
                  </button>
                </p>
              </div>
            ))}
          </div>
              </div>
          </div>
          <div>{text}</div>
          <div style={{ color: 'red' }}>{error}</div>

      </div>
    ); 

};

export default Details;