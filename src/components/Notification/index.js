import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {},
  notificationBar: {
    marginTop: '10px'
  }
}));

const Notification = ({ message, level }) => {
  const classes = useStyles();

  const NOTIFICATION_ERROR = 'error';
  const NOTIFICATION_WARNING = 'warning';
  const NOTIFICATION_INFO = 'info';
  const NOTIFICATION_SUCCESS = 'success';

  let internalLevel;

  switch (level) {
    case 'INFO':
      internalLevel = NOTIFICATION_INFO;
      break;
    case 'WARNING':
      internalLevel = NOTIFICATION_WARNING;
      break;
    case 'ERROR':
      internalLevel = NOTIFICATION_ERROR;
      break;
    case 'SUCCESS':
      internalLevel = NOTIFICATION_SUCCESS;
      break;
    default:
      internalLevel = NOTIFICATION_INFO;
      break;
  }

  return (
    <Box className={classes.notificationBar}>
      <Alert
        variant="filled"
        severity={internalLevel}
      >
        {message}
      </Alert>
    </Box>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
};

Notification.defaultProps = {};

export default Notification;
