import React, { Fragment } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartOpen } from '../../store/cart/cart.selector';

// router
import { Outlet, Link } from 'react-router-dom';

// logo
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

// styles
import './navigation.styles.scss';

// components
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import CartIcon from '../../components/cart-icon/CartIcon';
import { userSignOut } from '../../store/user/user.action';

const Navigation = () => {
  // redux
  const isCartOpen = useSelector(selectCartOpen);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const onSignOutHandler = () => dispatch(userSignOut());

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          {currentUser && (
            <div className="user">Hi, {currentUser.displayName}</div>
          )}
          <Link className="nav-link" to={'/shop'}>
            Shop
          </Link>

          {currentUser ? (
            <span onClick={onSignOutHandler} className="nav-link">
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to={'/auth'}>
              Sign In
            </Link>
          )}

          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
