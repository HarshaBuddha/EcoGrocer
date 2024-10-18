import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmBox from '../components/FarmBox';
import ProductCard from '../components/ProductCard';

function Home() {
    const [cart, setCart] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [farmsData, setFarmsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addToCart = (product) => {
        const quantity = quantities[product._id] || 1;
        const productWithQuantity = { ...product, selectedQuantity: quantity };
        const updatedCart = [...cart, productWithQuantity];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    };

    const handleBuyNow = (product) => {
        const quantity = quantities[product._id] || 1;
        const productWithQuantity = { ...product, selectedQuantity: quantity };
        localStorage.setItem('cart', JSON.stringify([productWithQuantity]));
        navigate('/payment');
    };

    useEffect(() => {
        const fetchFarms = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/farms');
                const data = await response.json();
                setFarmsData(data);
            } catch (error) {
                console.error('Error fetching farms:', error);
                setError('Failed to load farms. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFarms();
    }, []);

    const handleQuantityChange = (productId, delta) => {
        setQuantities((prevQuantities) => {
            const newQuantity = Math.max((prevQuantities[productId] || 1) + delta, 1);
            return { ...prevQuantities, [productId]: newQuantity };
        });
    };

    const renderFarmProducts = (products) => {
        return (
            <div className="products">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        quantity={quantities[product._id] || 1}
                        onAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        onQuantityChange={(delta) => handleQuantityChange(product._id, delta)}
                        onMouseEnter={() => setHoveredProductId(product._id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                        isHovered={hoveredProductId === product._id}
                    />
                ))}
            </div>
        );
    };

    if (loading) return <div>Loading farms...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="mainhead">
                <h1>Welcome to ECOGROCER</h1>
                <p>Fresh, Organic Food Delivered Directly From Farms to Your Doorstep</p>
            </div>

            {!selectedFarm ? (
                <div className="farm-container">
                    {farmsData.map((farm) => (
                        <FarmBox
                            key={farm._id} // Assuming _id is the unique identifier from your DB
                            farm={farm}
                            onClick={(name) => setSelectedFarm(farm.name)} // Ensure the farm name is set correctly
                        />
                    ))}
                </div>
            ) : (
                <div className="farm">
                    <button onClick={() => setSelectedFarm(null)}>Back to Farms</button>
                    <h2>{selectedFarm} Farms</h2>
                    <img 
                        src={farmsData.find(farm => farm.name === selectedFarm).farminside} 
                        alt={`${selectedFarm} Farms Logo`} 
                        className="farm-logo" 
                    />
                    {renderFarmProducts(farmsData.find(farm => farm.name === selectedFarm).products)}
                </div>
            )}
        </div>
    );
}

export default Home;
