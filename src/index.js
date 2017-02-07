import React from 'react';
import ReactDOM from 'react-dom';
import { Home, User } from './App';

import './index.css';
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'

let route = (
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <Route path="/user/:user" component={User}/>
     </Route>
  </Router>
)
ReactDOM.render(
  route,
  document.getElementById('root')
);
