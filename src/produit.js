import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from './categorieFilter';
import PriceFilter from './priceFilter';
import ColorFilter from './colorFilter';
import Search from './search';
import './css/produits.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [couleurs, setCouleurs] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [priceRange, setPriceRange] = useState({
    range1: false,
    range2: false,
    range3: false,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleColorChange = (event) => {
    const color = event.target.value;
    if (event.target.checked) {
      setSelectedColor((prevColor) => [...prevColor, color]);
    } else {
      setSelectedColor((prevColor) =>
        prevColor.filter((col) => col !== color)
      );
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCats((prevSelected) => [...prevSelected, category]);
    } else {
      setSelectedCats((prevSelected) =>
        prevSelected.filter((cat) => cat !== category)
      );
    }
  };

  const handlePriceChange = (event) => {
    const { name, checked } = event.target;
    setPriceRange((prevPrices) => ({
      ...prevPrices,
      [name]: checked,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const categoryFilter =
      selectedCats.length === 0
        ? true
        : selectedCats.includes(product.category.name);

    const colorFilter =
      selectedColor.length === 0
        ? true
        : selectedColor.includes(product.color.name);

    const { range1, range2, range3 } = priceRange;
    const priceRangeResult =
      (!range1 || (product.price >= 0 && product.price <= 100)) &&
      (!range2 || (product.price >= 101 && product.price <= 1000)) &&
      (!range3 || product.price >= 1001);

    const searchFilter = product.name.toLowerCase().includes(searchTerm.toLowerCase())

    console.log('searchFilter:', searchFilter);

    return searchFilter && colorFilter && categoryFilter && priceRangeResult;
  });

  useEffect(() => {
    fetch('https://insta-api-api.0vxq7h.easypanel.host/product-colors')
      .then((response) => response.json())
      .then((coul) => setCouleurs(coul))
      .catch((error) => console.error('Error fetch:', error));
  }, []);

  useEffect(() => {
    fetch('https://insta-api-api.0vxq7h.easypanel.host/product-categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetch:', error));
  }, []);

  useEffect(() => {
    fetch('https://insta-api-api.0vxq7h.easypanel.host/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetch:', error));
  }, []);
  
  // Filter
  return (
    <div className="container-fluid">
      <div className='header'>
        <img src='https://images.pexels.com/photos/702251/pexels-photo-702251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='coffee'></img>
      </div>
      <Search
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <div className="row content">
        <div className="col-md-2 filter-body" style={{ minWidth: "300px" }}>
          <div className="card">
            <div className="card-body">

              <CategoryFilter
                categories={categories}
                handleCategoryChange={handleCategoryChange}
              />

              <PriceFilter
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
              />

              <ColorFilter
                couleurs={couleurs}
                handleColorChange={handleColorChange}
              />

            </div>
          </div>
        </div>
        {/* Product List */}
        <div className="col-lg-8 ">
          <div className="row all-products">
            {filteredProducts.map((product) => (
              <div className="col-xl-4 col-md-6 " key={product.id}>
                <div className="card mb-4 full-card">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body coffee-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price}$</p>
                    <Link to={`/details/${product.id}`} className="btn btn-detail">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;