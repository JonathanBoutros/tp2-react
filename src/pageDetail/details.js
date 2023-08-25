import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/details.css";
import QuantityInput from './quantityInput';
import CartButton from './cartButton';
import WishlistButton from './wishlistButton';
import SoldStatus from './soldStatus.js';
import CommentSection from './commentSection';
import '../css/detail.css';

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
    fetch('https://insta-api-api.0vxq7h.easypanel.host/promotions')
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
      window.location.reload()
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
      window.location.reload()
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

  const popUpWish = () => {
    addToWishlist(detail.id);
    setText("ajout reussi a la Wishlist");
  }

  const popUpCart = () => {
    addToCart(id, quantity);
    setText("ajout reussi au cart");
  }

  setTimeout(() => {
    setError("");
  }, 10000)

  setTimeout(() => {
    setText("");
  }, 3000)

  return (
    <div className="container mt-5">

      <div className="row detail-card p-4">

        <div className="col-6">
          <div className="img-detail">
            <img src={detail.image} alt={detail.name} className="img-fluid rounded" />
          </div>
        </div>

        <div className="col-6">
          <h2 className="display-4">{detail.name}</h2>
          <p className="lead">
            <span className="font-weight-bold h3">{detail.price}</span>
            <span className="h4">$CA</span>
          </p>
          <p className="mb-3"><strong>Description:</strong> {detail.description}</p>
          <p className="mb-3"><strong>Category:</strong> {detail.category?.name}</p>
          <p className="mb-3"><strong>Color:</strong> {detail.color?.name}</p>

          <QuantityInput
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            className="mb-2"
          />
          <div className="d-flex justify-content-between mt-2">
            <CartButton
              detail={detail}
              cart={cart}
              popUpCart={popUpCart}
            />
            <WishlistButton
              detail={detail}
              wish={wish}
              popUpWish={popUpWish}
            />
          </div>
        </div>

      </div>

      <div className='row '>

        <div className='col-12 p-0'>
          <div className="card comment-card p-4">
            <SoldStatus detail={detail} sold={sold} />

            <CommentSection className="comment-section"
              commentValue={commentValue}
              handleComment={handleComment}
              addComment={addComment}
              allComments={allComments}
              deleteComment={deleteComment}
            />

            {text && <div className="mt-3 alert alert-info">{text}</div>}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
          </div>
        </div>

      </div>


    </div>
  );



};

export default Details;