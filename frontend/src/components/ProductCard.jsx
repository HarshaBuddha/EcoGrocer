import React from 'react';

function ProductCard({ product, onAddToCart, onBuyNow, onQuantityChange, quantity, onMouseEnter, onMouseLeave, isHovered }) {
  return (
    <div
      className="product"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={isHovered ? product.hoverImage : product.image}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>Rate: ${product.rate}</p>
      <p>Quantity: {product.quantity}</p>
      <div className="quantity-controls">
        <button onClick={() => onQuantityChange(-1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onQuantityChange(1)}>+</button>
      </div>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      <button onClick={() => onBuyNow(product)}>Buy It Now</button>
    </div>
  );
}

export default ProductCard;
