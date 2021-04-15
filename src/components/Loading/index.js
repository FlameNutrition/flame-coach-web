import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({
  message
}) => {
  return (
    <div>{message}</div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
