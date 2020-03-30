import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { TweenMax } from 'gsap';

import './header.scss';

import api from '../../api/api';
import Logo from '../../assets/img/logo.png';
import Environment from '../../../environment';

const Header = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const openLoginModal = (e) => {
    console.log(`abriu`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = {
      email,
      password
    }

    const response = await api.post(`${Environment.API_URL}/auth/authenticate`, login);

    setUser({
      email: response.data.user.email,
      role: response.data.user.role,
      token: response.data.token
    })
  }
  
  useEffect(() => {
    props.onUserLogin(user);
    sessionStorage.setItem('@crudToken', user.token); 
  }, [user])

  return (
    <header data-component="header">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <img className="logo" src={Logo} alt="RCA Digital Logo" title="RCA Digital"/>
            <span className="title">Products</span>
          </div>

          <div className="col-auto align-items-center d-flex">
            { user.email && (
              <span className="welcome">Welcome { user.email.split('@')[0] }</span>
            )}
            <div className="login">
              <button className="main-btn bigger" type="button" onClick={e => openLoginModal(e)}>Login</button>
              <form className="form" onSubmit={handleSubmit}>
                <input 
                  className="input-field" 
                  type="email" 
                  placeholder="E-mail" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                />
                <input 
                  className="input-field" 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                />
                <button className="main-btn btn-login">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;