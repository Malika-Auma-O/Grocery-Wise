import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products?skip=5&limit=50';

const formatAmountInEuro = (amount) => {
  return amount.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR'
  });
};

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchData(API_URL);
  }, []);

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setProducts(response.data.products);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }

  const addToCart = (product) => {
    product.quantity = 1;

    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: product,
    }));
  };

  const isInCart = (productId) => Object.keys(cart || {}).includes(productId.toString());

  if (error) {
    return <h3>An error occurred when fetching data. Please check the API and try again.</h3>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>Products</h1>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: {formatAmountInEuro(product.price)}</p> {/* Format the price in euros */}
            <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
