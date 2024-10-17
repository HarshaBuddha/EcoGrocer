import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Fetch all farms to get their products
        const response = await fetch('http://localhost:5000/farms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const farms = await response.json();

        // Extract products from all farms and filter them based on the search query
        const allProducts = farms.flatMap(farm => 
          farm.products.map(product => ({
            ...product,
            farmName: farm.name // Add farm name to each product
          }))
        );
        
        const filteredResults = allProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to load search results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : results.length > 0 ? (
        results.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Farm: {product.farmName}</p> {/* Display the farm name */}
            <p>Rate: ${product.rate}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))
      ) : (
        <p>No products found matching "{query}"</p>
      )}
    </div>
  );
}

export default SearchResults;
