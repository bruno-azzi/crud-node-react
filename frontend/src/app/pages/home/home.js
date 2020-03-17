import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './home.scss';

import Banner from '../../assets/img/main-banner.png';

import Environment from '../../../environment';

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ProductsGrid from "../../components/products-grid/products-grid";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get(`${Environment.API_URL}/products`);
      setProducts(response.data);
    }

    loadProducts();
  }, []);

  return (
    <>
      <Header/>
      <main data-component="main">
          <img src={Banner} alt="Banner" title="Banner" className="banner"/>

          {
            products.length > 0 ? (
              <ProductsGrid products={products}/>
            ) : (
              <h1>loading ...</h1>
            )
          }
      </main>
      <Footer/>
    </>
  )
}

export default Home;