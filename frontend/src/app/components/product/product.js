import React from 'react';

import './product.scss';

import imgNotFound from "../../assets/img/no-img.png";

const Product = (props) => {
  
  const { product } = props;

  return (
    <div data-component="product">
      <div className="product-header row align-items-start">
        <div className="col-9 left">
          <span className="title">{product.title}</span>
          <span className="platforms">{product.platforms}</span>
        </div>

        <div className="col-3 right">
          <div className="price">${product.price}</div>
        </div>
      </div>
      
      <div className="wrapper">
        {
          product.image ? (
            <img src={`data:image/jpeg;base64, ${product.image}`} alt={`Imagem do produto ${product.title}`} title={product.title} className="img"/>
          ) : (
            <img src={`${imgNotFound}`} alt={`Imagem do produto ${product.title}`} title={product.title} className="img"/>
          )
        }
        <button className="main-btn">Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
