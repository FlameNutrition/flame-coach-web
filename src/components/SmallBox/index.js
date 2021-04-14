import {
  Box, Button, Typography, makeStyles
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  image: {
    marginRight: '5px',
    width: '24px',
    height: '24px'
  }
}));

const SmallBox = ({
  title, message, icon, iconEnable, btnEnable, btnLabel, btnHref
}) => {
  const classes = useStyles();

  return (
    <Box
      p={2}
      m={2}
      bgcolor="background.dark"
    >
      <Box
        display="flex"
        justifyContent="center"
      >
        {iconEnable
          ? React.cloneElement(icon, { className: classes.image })
          : null }
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {title}
        </Typography>
      </Box>
      <Typography
        align="center"
        variant="body2"
      >
        {message}
      </Typography>
      {btnEnable
        ? (
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
          >
            <Button
              color="primary"
              component="a"
              target="_blank"
              href={btnHref}
              variant="contained"
            >
              {btnLabel}
            </Button>
          </Box>
        )
        : null}
    </Box>
  );
};

SmallBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  iconEnable: PropTypes.bool.isRequired,
  icon: PropTypes.object,
  btnEnable: PropTypes.bool.isRequired,
  btnLabel: PropTypes.string,
  btnHref: PropTypes.string
};

SmallBox.defaultProps = {
};

export default SmallBox;
