import React from 'react';

import './header.scss';

import Logo from '../../assets/img/logo.png';

const Header = () => {
  return (
    <header data-component="header">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <img className="logo" src={Logo} alt="RCA Digital Logo" title="RCA Digital"/>
            <span className="title">Products</span>
          </div>

          <div className="col-auto">
            <button className="main-btn bigger" type="button">Login</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;