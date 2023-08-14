import React from 'react';

const ColorFilter = ({ couleurs, handleColorChange }) => {
  return (
    <div className="container">
      <h2>Couleur</h2>
      <div>
        {couleurs.map((couleur) => (
          <div className="form-check" key={couleur.id}>
            <input
              type="checkbox"
              value={couleur.name}
              onChange={handleColorChange}
              className="form-check-input"
              id={`couleur-${couleur.id}`}
            />
            <label className="form-check-label" htmlFor={`couleur-${couleur.id}`}>
              {couleur.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;


