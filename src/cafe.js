import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1>Café</h1>
      <Link to={"/createCafe"}>Ajouter café</Link>
      <div>
        {cafes.map((cafe) => (
          <div key={cafe.id}>
            <img src={cafe.pictureUrl} alt={cafe.name} />
            <p>{cafe.name}</p>
            <p>{cafe.description}</p>
            <button onClick={() => removeCafe(cafe.id)}>Effacer</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CafeList;
