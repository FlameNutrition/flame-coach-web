import {
  Box,
  Collapse,
  IconButton,
  makeStyles
} from '@material-ui/core';
import {
  ERROR,
  INFO,
  SUCCESS,
  WARNING
} from './notificationTypes';

import { Alert } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {},
  notificationBar: {
    marginTop: '10px'
  }
}));

const Notification = ({
  open,
  openHandler,
  message,
  level,
  collapse,
  className
}) => {
  const classes = useStyles();

  let internalLevel;

  switch (level) {
    case INFO:
      internalLevel = 'info';
      break;
    case WARNING:
      internalLevel = 'warning';
      break;
    case ERROR:
      internalLevel = 'error';
      break;
    case SUCCESS:
      internalLevel = 'success';
      break;
    default:
      internalLevel = 'info';
      break;
  }

  return (
    <Box className={clsx(className, classes.notificationBar)}>
      {collapse
        ? (
          <Collapse in={open}>
            <Alert
              variant="filled"
              severity={internalLevel}
              action={(
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    openHandler(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              )}
            >
              {message}
            </Alert>
          </Collapse>
        ) : (
          <Alert
            itemID="notification"
            variant="filled"
            severity={internalLevel}
          >
            {message}
          </Alert>
        )}
    </Box>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  open: PropTypes.bool,
  openHandler: PropTypes.func,
  collapse: PropTypes.bool,
  className: PropTypes.string
};

Notification.defaultProps = {
  collapse: false
};

export default Notification;
