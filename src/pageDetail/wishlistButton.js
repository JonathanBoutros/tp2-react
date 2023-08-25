import React from 'react';

const WishlistButton = ({ detail, popUpWish, wish }) => {


  const wishPresent = () => {
    const isProductInWish = wish.some(item => item.id === detail.id);

    return (
      <div>
        {isProductInWish ? (
          <p className='text-success'>Already in wishlist</p>
        ) : (
          ''
        )
        }
      </div >
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
