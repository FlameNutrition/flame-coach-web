import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loggedOut } from '../../../store/actions';

const LogoutView = ({ isAuth, signOut }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      signOut();
    }

    navigate('/', { replace: true });
  }, []);

  return (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.loggedIn
  };
};

// eslint-disable-next-line react-redux/mapDispatchToProps-prefer-shorthand
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(loggedOut())
});

LogoutView.propTypes = {
  isAuth: PropTypes.bool,
  signOut: PropTypes.func
};

export { LogoutView, mapStateToProps, mapDispatchToProps };
