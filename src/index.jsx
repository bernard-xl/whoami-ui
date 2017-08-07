import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import { BrowserRouter, NavLink, Route } from 'react-router-dom';

import NavBar from './whoami/components/NavBar';
import ResumeSubmission from './whoami/components/ResumeSubmission';
import ResumeSearch from './whoami/components/ResumeSearch';
import LoginModal from './whoami/components/LoginModal';

import store from './whoami/state/store';

import './index.css';

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <NavBar>
          <NavLink exact to="/">Submission</NavLink>
          <NavLink to="/search">Search</NavLink>
        </NavBar>
        <div className="container">
          <Route exact path="/" component={ResumeSubmission} />
          <Route path="/search" component={ResumeSearch} />
        </div>
        <LoginModal />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
