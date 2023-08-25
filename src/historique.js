import React, { useState, useEffect } from 'react';
import './css/historique.css';

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
        <div className='container-fluid '>
            <div className='row d-flex flex-wrap wish-cont'>
                <div className='col-2 hist-title-wrap'>
                    <h1 className='hist-title'>Historique</h1>
                </div>
                <div className='col-9 wish-wrap'>
                    <div className='row pl-5 pt-4'>

                        {historiques.map((historique) => (
                            <div className='card wish-card col-lg-3 col-md-5 col-sm-11 my-3 mx-2' key={historique.id}>
                                <img src={historique.image} alt={historique.name} />
                                <div className='card-body wish-body'>
                                    <p>{historique.name}</p>
                                    <p className='border-wish mb-2'></p>
                                    <p className='btn-dlt-wish' onClick={() => removeFromHistorique(historique.id)}>Effacer</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Historique;