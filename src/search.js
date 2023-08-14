import React from "react";

const Search = ({ searchTerm, handleSearch }) => {
    return (
    <>
        <div className="container">
        <div className="row">
            <div className="col-md-6 mx-auto">
            <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                //commentaire
                placeholder="Rechercher"
                value={searchTerm}
                onChange={handleSearch}
                />
            </div>
            </div>
        </div>
        </div>
    </>
    );
}

export default Search;