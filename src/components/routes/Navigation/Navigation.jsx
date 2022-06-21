import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

// Context
import { UserContext } from '../../../context/UserContext';
import { CartContext } from '../../../context/CartContext';

// Firebase Utils
import { signOutUser } from '../../../utils/firebase/firebase.utils';

// Styles
import './Navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';

// Components
import CartIcon from '../../CartIcon/CartIcon';
import CartDropDown from '../../CartDropDown/CartDropDown';

const Navigation = () => {
  // Context
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
