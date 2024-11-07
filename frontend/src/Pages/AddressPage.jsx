import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddressPage() {
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    phoneNumber: '', // Add phoneNumber to the state
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve cart and totalAmount from the location state
  const { cart, totalAmount } = location.state || { cart: [], totalAmount: 0 };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store address in localStorage or send to server as needed
    localStorage.setItem('address', JSON.stringify(address));

    // Navigate to the payment page with totalAmount, cart, and address
    navigate('/payment', { state: { totalAmount, cart, address } });
  };

  return (
    <div className="address-container">
      <h1>Enter Your Address</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={address.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel" // Change input type to tel for phone numbers
            id="phoneNumber"
            name="phoneNumber"
            value={address.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default AddressPage;
