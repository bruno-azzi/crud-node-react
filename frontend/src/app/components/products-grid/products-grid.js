import React from 'react';

import Product from '../product/product';

import './products-grid.scss';

const ProductsGrid = (props) => {
  const { products } = props;
  console.log(products);

  return (
    <section data-component='products-grid'>
      <div className='container'>
        <div className='row justify-content-between align-items-center title-row'>
          <div className='col-auto'>
            <h2 className='main-title'>Products</h2>
          </div>

          <div className='col-auto'>
            <button className='cart-btn'>
              <i className='icon'></i>
              <span className='counter'>1</span>
            </button>
          </div>
        </div>

        <div className='row justify-content-center'>
          { products.map((item) => (
            <div className='col-sm-6 col-md-4 col-lg-3 column' key={item.id}>
              <Product product={item} />
            </div>
          )) }
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
