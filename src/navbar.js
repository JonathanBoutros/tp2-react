import { Link } from 'react-router-dom';
import './css/navbar.css';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-danger">
            <a className="navbar-brand" href="#">Roasted cup</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <Link to={"/cafe"} className="nav-link">Café</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">Accueil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/cart"} className="nav-link">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/wishlist"} className="nav-link">Wishlist</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/historique"} className="nav-link">Historique</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
