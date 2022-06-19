import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import './Navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link to={'/'} className="logo-container">
          <div>
            <CrwnLogo className="logo" />
          </div>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to={'/shop'}>
            SHOP
          </Link>
          <Link className="nav-link" to={'/signin'}>
            Sign In
          </Link>
          <Link className="nav-link" to={'/signup'}>
            Sign Up
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
