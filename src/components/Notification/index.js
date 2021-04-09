import React from 'react';
import {
  Box, Collapse, IconButton, makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
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
