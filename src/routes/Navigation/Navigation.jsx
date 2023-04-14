import React, { Fragment, useContext } from 'react';

// firebase
import { signOutUser } from '../../utils/firebase/firebase.utils';

// context
import { UserContext } from '../../context/UserContext';

// router
import { Outlet, Link } from 'react-router-dom';

// logo
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
  // context
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // handler
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={'/shop'}>
            Shop
          </Link>

          {currentUser ? (
            <span onClick={signOutHandler} className="nav-link">
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to={'/auth'}>
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
