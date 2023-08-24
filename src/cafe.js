import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/cafe.css';

const CafeList = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    fetch('https://insta-api-api.0vxq7h.easypanel.host/coffees')
      .then((response) => response.json())
      .then((data) => setCafes(data))
      .catch((error) => console.error('Error fetch:', error));
  }, []);

  const removeCafe = async (cafeId) => {
    try {
      const response = await fetch(`https://insta-api-api.0vxq7h.easypanel.host/coffees/${cafeId}`, {
        method: 'DELETE',
      });

      console.log('Cart item deleted:', response);

      window.location.reload();
    } catch (error) {
      console.error('Error delete product cart:', error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="list-content">
          <div className="title-header">
            <h1>Café</h1>
          </div>



          <div className="cofe-container">
            <div className="create-container">
              <button className="btn-create"><Link to={"/createCafe"} className="ajouter-cafe">Ajouter café</Link></button>
            </div>

            {cafes.map((cafe) => (
              <div key={cafe.id} className="cofe">
                <img src={cafe.pictureUrl} alt={cafe.name} className="img-fluid cofe-img" />
                <div className="cofe-content">
                  <h4>{cafe.name}</h4>
                  <span>{cafe.description}</span>
                  <span className="line"></span>
                  <span className="delete-btn" onClick={() => removeCafe(cafe.id)}>Effacer</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

    </>
  );
}

export default CafeList;
