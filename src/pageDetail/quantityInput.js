import React from 'react';

const QuantityInput = ({ quantity, handleQuantityChange }) => {
  return (
    <input
      type='number'
      min="1"
      value={quantity}
      onChange={handleQuantityChange}
      className="form-control mb-2 quantity bg-light mb-5"
    />
  );
};

export default QuantityInput;
