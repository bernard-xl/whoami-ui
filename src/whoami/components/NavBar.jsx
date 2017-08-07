import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from 'elemental/lib/components/Button';

import 'elemental/less/elemental.less';

import { openLoginModal, logout } from '../actions/auth';

import './NavBar.css';

const Logo = () => (
  <div className="logo">R<span>é</span>sum<span>é</span></div>
);

const User = ({ user, onLoginClick, onLogoutClick }) => {
  if (user) {
    return (
      <div className="user">
        <span>Logged in as {user}</span>
        <Button type="hollow-primary" onClick={onLogoutClick}>Logout</Button>
      </div>
    );
  }
  return (
    <div className="user">
      <Button type="hollow-primary" onClick={() => onLoginClick()}>Login</Button>
    </div>
  );
};

const NavBarView = ({ children, user, onLoginClick, onLogoutClick }) => (
  <div className="navbar">
    <Logo />
    { children }
    <User user={user} onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
  </div>
);

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = dispatch => ({
  onLoginClick: () => dispatch(openLoginModal),
  onLogoutClick: () => dispatch(logout),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarView));

