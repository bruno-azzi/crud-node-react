import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Header from './components/header/header';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" exact component={Home}/>
      <Route exact path="/header" exact component={Header}/>
    </BrowserRouter>
  )
}