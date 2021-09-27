import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core";

import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  image: {
    marginRight: '5px',
    width: '24px',
    height: '24px'
  }
}));

const NavBarBox = ({
  title,
  message,
  icon,
  iconEnable,
  btnEnable,
  btnLabel,
  btnHref
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
          : null}
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

NavBarBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  iconEnable: PropTypes.bool,
  icon: PropTypes.object,
  btnEnable: PropTypes.bool,
  btnLabel: PropTypes.string,
  btnHref: PropTypes.string
};

NavBarBox.defaultProps = {
  btnEnable: false,
  iconEnable: false
};

export default NavBarBox;
