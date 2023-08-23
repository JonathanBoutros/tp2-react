import React from 'react';

const SoldStatus = ({ detail, sold }) => {
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

export default SoldStatus;
