import React from 'react';

import Product from '../product/product';

import './products-grid.scss';

const ProductsGrid = (props) => {
  const { products, user } = props;

  return (
    <div className='row' data-component="products-grid">
      { 
        products.map((item) => (
          <div className='col-sm-6 col-md-4 col-lg-3 column' key={item.id}>
            <Product product={item} role={user.role}/>
          </div>
        ))
      }
    </div>
  );
};

export default ProductsGrid;
