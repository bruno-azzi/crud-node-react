import React, { useEffect, useState } from 'react';

import './home.scss';

import Banner from '../../assets/img/main-banner.png';

import api from '../../api/api';

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ProductsGrid from "../../components/products-grid/products-grid";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get(`/products`);
      setProducts(response.data);
      setLoader(false);
    }

    loadProducts();
  }, []);

  const getLoggedUser = (user) => {
    setCurrentUser(user);
  }

  console.log('CurrentUser: ', currentUser);

  return (
    <>
      <Header onUserLogin={getLoggedUser}/>
      <main data-component="main">
        <img src={Banner} alt="Banner" title="Banner" className="banner"/>

        <section className="products">
          <div className='container'>
            <div className='row justify-content-between align-items-center title-row'>
              <div className='col-auto'>
                <h2 className='main-title'>
                  Products 
                  { products.length > 0 && (
                    <span className="products-qty">({products.length})</span>
                  )}
                  </h2>
              </div>

              <div className='col-auto'>
                <button className='cart-btn'>
                  <i className='icon'></i>
                  <span className='counter'>1</span>
                </button>
              </div>
            </div>

            {
              products.length > 0 && !loader ? (
                <ProductsGrid products={products} user={currentUser}/>
              ) : ( products.length === 0 && !loader ?
                <h1>lista vazia</h1>
                : <h1>loading ...</h1>
              )
            }
          </div>
        </section>

        
      </main>
      <Footer/>
    </>
  )
}

export default Home;