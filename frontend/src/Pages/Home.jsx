import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmBox from '../components/FarmBox';
import ProductCard from '../components/ProductCard';

function Home() {
    const [cart, setCart] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const navigate = useNavigate();

    // Product data with secondary images and farm inside images
    const farms = {
        Varadha: {
            products: [
                { id: 1, name: 'Organic Apples', rate: 3, quantity: '1 kg', image: 'assets/apple.jpeg', hoverImage: 'assets/apple-hover.jpg' },
                { id: 2, name: 'Fresh Carrots', rate: 2, quantity: '500 g', image: 'assets/carrot.jpeg', hoverImage: 'assets/carrot-hover.jpg' },
                { id: 3, name: 'Natural Almonds', rate: 10, quantity: '250 g', image: 'assets/almonds.jpeg', hoverImage: 'assets/almonds-hover.jpg' },
                { id: 4, name: 'Farm-Fresh Milk', rate: 5, quantity: '1 L', image: 'assets/milk.jpeg', hoverImage: 'assets/milk-hover.jpg' },
                { id: 5, name: 'Organic Spinach', rate: 2, quantity: '250 g', image: 'assets/spinach.jpeg', hoverImage: 'assets/spinach-hover.jpg' },
            ],
            farminside: 'assets/varadhiinside.webp'
        },
        Vamshi: {
            products: [
                { id: 6, name: 'Free-Range Eggs', rate: 4, quantity: '12 pcs', image: 'assets/eggs.jpeg', hoverImage: 'assets/eggs-hover.jpg' },
                { id: 7, name: 'Pure Honey', rate: 8, quantity: '500 ml', image: 'assets/honey.jpeg', hoverImage: 'assets/honey-hover.jpg' },
                { id: 8, name: 'Organic Tomatoes', rate: 3, quantity: '1 kg', image: 'assets/tomatos.jpeg', hoverImage: 'assets/tomato-hover.png' },
                { id: 9, name: 'Raw Walnuts', rate: 9, quantity: '250 g', image: 'assets/walnut.jpeg', hoverImage: 'assets/raw-walnut.png' },
                { id: 10, name: 'Whole Wheat Bread', rate: 4, quantity: '1 loaf', image: 'assets/wheat bread.jpeg', hoverImage: 'assets/wheatbrownbread.png' },
            ],
            farminside: 'assets/vamshiinside.jpeg'
        },
        Keshav: {
            products: [
                { id: 11, name: 'eggs', rate: 15, quantity: '12 pcs', image: 'assets/eggs.jpeg', hoverImage: 'assets/eggs-hover.jpg' },
                { id: 12, name: 'Fresh Carrots', rate: 2, quantity: '500 g', image: 'assets/carrot.jpeg', hoverImage: 'assets/carrot-hover.jpg' },
                { id: 13, name: 'Natural Almonds', rate: 10, quantity: '250 g', image: 'assets/almonds.jpeg', hoverImage: 'assets/almonds-hover.jpg' },
                { id: 14, name: 'Farm-Fresh Milk', rate: 5, quantity: '1 L', image: 'assets/milk.jpeg', hoverImage: 'assets/milk-hover.jpg' },
                { id: 15, name: 'Organic Spinach', rate: 2, quantity: '250 g', image: 'assets/spinach.jpeg', hoverImage: 'assets/spinach-hover.jpg' },
            ],
            farminside: 'assets/keshavinside.jpg'
        }
    };

    const addToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        const productWithQuantity = { ...product, selectedQuantity: quantity };
        const updatedCart = [...cart, productWithQuantity];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    };

    const handleBuyNow = (product) => {
        const quantity = quantities[product.id] || 1;
        const productWithQuantity = { ...product, selectedQuantity: quantity };
        localStorage.setItem('cart', JSON.stringify([productWithQuantity]));
        navigate('/payment');
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
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
                        key={product.id}
                        product={product}
                        quantity={quantities[product.id] || 1}
                        onAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                        onQuantityChange={(delta) => handleQuantityChange(product.id, delta)}
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                        isHovered={hoveredProductId === product.id}
                    />
                ))}
            </div>
        );
    };

    const farmsData = [
        { name: 'Varadha', logo: 'assets/varadhi.jpeg', description: 'Providing the freshest organic produce directly from our farm to your table.' },
        { name: 'Vamshi', logo: 'assets/vamshi.jpeg', description: 'Experience the goodness of nature with our range of organic products.' },
        { name: 'Keshav', logo: 'assets/keshav.jpeg', description: 'Fresh, local, and organic - we bring the farm to your doorstep.' }
    ];

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
                            key={farm.name}
                            farm={farm}
                            onClick={(name) => setSelectedFarm(name)}
                        />
                    ))}
                </div>
            ) : (
                <div className="farm">
                    <button onClick={() => setSelectedFarm(null)}>Back to Farms</button>
                    <h2>{selectedFarm} Farms</h2>
                    <img src={farms[selectedFarm].farminside} alt={`${selectedFarm} Farms Logo`} className="farm-logo" />
                    {renderFarmProducts(farms[selectedFarm].products)}
                </div>
            )}
        </div>
    );
}

export default Home;
 