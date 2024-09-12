import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const DELIVERY_CHARGE = 5; // Set a fixed delivery charge

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Function to handle removing an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to handle quantity change
  const handleQuantityChange = (index, delta) => {
    const updatedCart = cart.map((product, i) => {
      if (i === index) {
        const newQuantity = Math.max(product.selectedQuantity + delta, 1);
        return { ...product, selectedQuantity: newQuantity };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to calculate the total cost of items in the cart
  const calculateTotal = () => {
    const total = cart.reduce((acc, product) => acc + product.rate * product.selectedQuantity, 0);
    return total + DELIVERY_CHARGE; // Add delivery charge to total
  };

  // Function to handle "Buy It Now" for all items in the cart
  const handleBuyNow = () => {
    if (cart.length > 0) {
      // Store the current cart for purchase
      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/payment'); // Redirect to the payment page
    } else {
      alert('Your cart is empty. Please add some products to proceed.');
    }
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <>
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <div>
                <h3>{product.name}</h3>
                <p>Rate: ${product.rate}</p>
                <p>Quantity: {product.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{product.selectedQuantity}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                </div>
              </div>
              <button className="remove-button" onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          {/* Display the grand total including delivery charge */}
          <div className="cart-total">
            <h3>Delivery Charge: ${DELIVERY_CHARGE}</h3>
            <h3>Grand Total: ${calculateTotal()}</h3>
          </div>
          {/* Button to buy all items in the cart */}
          <div className="buy-now-container">
            <button className="buy-now-button" onClick={handleBuyNow}>Buy All Now</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty. Start adding some organic products!</p>
      )}
    </div>
  );
}

export default Cart;
