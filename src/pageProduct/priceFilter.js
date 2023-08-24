import React from 'react';

const PriceFilter = ({ priceRange, handlePriceChange }) => {
  return (
    <div className="container">
      <h2>Prix</h2>
      <div className="form-check">
        <input
          type="checkbox"
          name="range1"
          checked={priceRange.range1}
          onChange={handlePriceChange}
          className="form-check-input"
          id="range1"
        />
        <label className="form-check-label" htmlFor="range1">
          0-100
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          name="range2"
          checked={priceRange.range2}
          onChange={handlePriceChange}
          className="form-check-input"
          id="range2"
        />
        <label className="form-check-label" htmlFor="range2">
          101-1000
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          name="range3"
          checked={priceRange.range3}
          onChange={handlePriceChange}
          className="form-check-input"
          id="range3"
        />
        <label className="form-check-label" htmlFor="range3">
          1001+
        </label>
      </div>
    </div>

  );
};

export default PriceFilter;
