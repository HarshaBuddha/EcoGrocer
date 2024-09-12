import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Example product data (should be fetched from an API or state)
    const allProducts = [
      { id: 1, name: 'Organic Apples', rate: 3, quantity: '1 kg', image: 'apple.jpeg' },
      { id: 2, name: 'Fresh Carrots', rate: 2, quantity: '500 g', image: 'carrot.jpeg' },
      { id: 3, name: 'Natural Almonds', rate: 10, quantity: '250 g', image: 'almonds.jpeg' },
      { id: 4, name: 'Farm-Fresh Milk', rate: 5, quantity: '1 L', image: 'milk.jpeg' },
      { id: 5, name: 'Organic Spinach', rate: 2, quantity: '250 g', image: 'spinach.jpeg' },
      { id: 6, name: 'Free-Range Eggs', rate: 4, quantity: '12 pcs', image: 'eggs.jpeg' },
      { id: 7, name: 'Pure Honey', rate: 8, quantity: '500 ml', image: 'honey.jpeg' },
      { id: 8, name: 'Organic Tomatoes', rate: 3, quantity: '1 kg', image: 'tomatos.jpeg' },
      { id: 9, name: 'Raw Walnuts', rate: 9, quantity: '250 g', image: 'walnut.jpeg' },
      { id: 10, name: 'Whole Wheat Bread', rate: 4, quantity: '1 loaf', image: 'wheat bread.jpeg' },
      // Add more products here
    ];

    // Filter products based on search query
    const filteredResults = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
    setLoading(false);
  }, [query]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        results.map(product => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
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
