import React from "react";
import '../css/search.css';


const Search = ({ searchTerm, handleSearch }) => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-12 input search-bar">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rechercher"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;