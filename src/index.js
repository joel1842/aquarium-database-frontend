import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithNav from './auth/auth0-provider-with-nav';

import './index.css';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithNav>
      <App />
    </Auth0ProviderWithNav>
  </Router>,
  document.getElementById('root'),
);