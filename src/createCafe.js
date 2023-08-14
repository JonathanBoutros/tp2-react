import React, { useState } from "react";

const AddCafe = () => {
    const [name, setName] = useState("");
    const [pictureUrl, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const ajout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://insta-api-api.0vxq7h.easypanel.host/coffees', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, description, pictureUrl }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            
              const data = await response.json();
              console.log('café ajouter:', data);
            } catch (error) {
              console.error('Error ajout café:', error);
              setErrorMessage(error.message);
            }
          };

    return (
        <>
            <h1>Ajouter café</h1>
            <form onSubmit={ajout}>
                <div>
                    <label htmlFor="name">Nom:</label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="pictureUrl">Image:</label>
                    <input
                    type="text"
                    id="pictureUrl"
                    value={pictureUrl}
                    onChange={(e) => setPicture(e.target.value)}
                    />
                     {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <button type="submit">Ajouter</button>
                </div>
            </form>
        </>
    );
}

export default AddCafe;
