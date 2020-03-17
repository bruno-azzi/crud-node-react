import React from 'react';

import './footer.scss';

import Logo from '../../assets/img/logo.png';

const Footer = () => {
  return (
    <footer data-component="footer">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-12 col-sm-auto">
            <img className="logo" src={Logo} alt="RCA Digital Logo" title="RCA Digital"/>
          </div>

          <div className="col-12 col-sm-auto">
            <p className="copyright">Teste front-end 2020 - RCA Digital</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
