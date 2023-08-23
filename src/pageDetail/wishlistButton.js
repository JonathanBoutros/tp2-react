import React from 'react';

const WishlistButton = ({ detail, popUpWish, wish }) => {


    const wishPresent = () => {
        const isProductInWish = wish.some(item => item.id === detail.id);
  
        return (
          <div>
            {isProductInWish ? (
              <p>Ce produit est dans votre Wishlist.</p>
            ) : (
              <p>Ce produit n'est pas dans votre Wishlist.</p>
            )}
          </div>
        );
      }

    return (
    <div>
      <button onClick={popUpWish} className="btn btn-secondary">
        Add to Wishlist
      </button>
      <p>{wishPresent(detail.id)}</p>
    </div>
  );
};

export default WishlistButton;
