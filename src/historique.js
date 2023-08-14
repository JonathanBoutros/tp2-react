import React, { useState, useEffect } from 'react';

const Historique = () => {
    
    const [historiques, setHistorique] = useState([])

    useEffect(() => {
        fetch('https://insta-api-api.0vxq7h.easypanel.host/suggestions/recently-viewed-products')
          .then((response) => response.json())
          .then((data) => setHistorique(data))
          .catch((error) => console.error('Error fetch:', error));
      }, []);

    const removeFromHistorique = async (productId) => {
    try {
        const response = await fetch(`https://insta-api-api.0vxq7h.easypanel.host/suggestions/recently-viewed-products/${productId}`, {
        method: 'DELETE',
        });

        console.log('Cart item deleted:', response);

        window.location.reload();
    } catch (error) {
        console.error('Error delete product cart:', error);
    }
    };

    return (
        <div>
            <h1>Historique</h1>
            <div>
                {historiques.map((historique) => (
                <div key={historique.id}>
                    <img src={historique.image} alt={historique.name} />
                    <p>{historique.name}</p>
                    <button onClick={() => removeFromHistorique(historique.id)}>Effacer</button>
                </div>
                ))}
            </div>
        </div>
    )
};

export default Historique;