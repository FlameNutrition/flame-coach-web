import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import React from 'react';

const Loading = ({
  size
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress size={size}/>
    </Box>
  );
};

Loading.propTypes = {
  size: PropTypes.number,
};

export default Loading;
