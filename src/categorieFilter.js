import React from "react";

const CategoryFilter = ({ categories, handleCategoryChange }) => {
  return (
    <div className="container">
      <h2>Categorie</h2>
      <div>
        {categories.map((categorie) => (
          <div className="form-check" key={categorie.id}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`categorie-${categorie.id}`}
              value={categorie.name}
              onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor={`categorie-${categorie.id}`}>
              {categorie.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
