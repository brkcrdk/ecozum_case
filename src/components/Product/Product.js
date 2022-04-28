import React, { useState, useContext } from "react";
import { CardDispatchContext, addToCard } from "../../context/card";
import "./Product.css";

const ProductCard = ({ data }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CardDispatchContext);

  const handleAddToCart = () => {
    const product = { ...data, quantity: 1 };
    addToCard(dispatch, product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 4000);
  };

  return (
    <div className="product">
      <div className="product-image">
        <img src={data.image} alt="product" />
      </div>
      <h4 className="product-name">{data.name}</h4>
      <p className="product-price">{data.price}</p>
      <h4 className="product-name">{data.desciption}</h4>
      <div className="product-action">
        <button
          className={!isAdded ? "" : "added"}
          type="button"
          onClick={handleAddToCart}
        >
          {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
