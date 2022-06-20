import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

// Context
import { UserContext } from '../../../context/UserContext';

// Firebase Utils
import { signOutUser } from '../../../utils/firebase/firebase.utils';

// Styles
import './Navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';

const Navigation = () => {
  // Context
  const { currentUser } = useContext(UserContext);

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
          {currentUser ? (
            <button onClick={signOutUser} className="nav-link">
              Sign Out
            </button>
          ) : (
            <Link className="nav-link" to={'/auth'}>
              {currentUser ? 'Sign Out' : 'Sign In'}
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
