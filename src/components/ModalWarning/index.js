import React, { useState } from 'react';
import {
  Box, Modal, Typography, useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const getModalStyle = () => {
  const top = 40;

  return {
    top: `${top}%`,
    margin: 'auto'
  };
};

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paperSize: {
    width: '40%',
  },
  paperSizeMobile: {
    width: '70%',
  },
  message: {
    marginTop: '10px'
  }
}));

const ModalWarning = ({
  title, message, open, onCloseHandler
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  return (
    <Modal
      open={open}
      onClose={onCloseHandler}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        style={modalStyle}
        className={clsx(classes.paper,
          isMobile ? classes.paperSizeMobile : classes.paperSize)}
      >
        <Typography variant="h4" id="modal-title">
          {title}
        </Typography>
        <Typography
          className={classes.message}
          variant="body2"
          id="modal-description"
        >
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

ModalWarning.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func
};

ModalWarning.defaultProps = {
  onCloseHandler: null
};

export default ModalWarning;
