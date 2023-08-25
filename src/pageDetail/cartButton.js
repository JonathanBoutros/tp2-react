import React from 'react';

const CartButton = ({ popUpCart, detail, cart }) => {

  const cartPresent = () => {
    const isProductInCart = cart.some(item => item.id === detail.id);
    return (
      <div>
        {isProductInCart ? (
          <p className='text-success'>Ce produit est dans votre panier.</p>
        ) : (
          ''
        )}
      </div>
    );
  }

  return (
    <div>
      <button onClick={popUpCart} className="btn btn-danger mr-2">
        Add to Cart
      </button>
      <p>{cartPresent(detail.id)}</p>
    </div>
  );
};

export default CartButton;
