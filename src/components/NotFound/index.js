import {
  Box, Container, makeStyles, Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import PageNotFound from '../../images/404';
import { useIsMobile } from '../../utils/mediaUtil';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  imageLayout: {
    marginTop: '10px',
    width: '100%'
  },
  imageMobile: {
    height: 'auto',
    width: '50%'
  },
  image: {
    width: '300pt',
    height: '300pt'
  }
}));

const NotFound = ({ title, submessage }) => {
  const classes = useStyles();
  const isMobile = useIsMobile();

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.root}
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          {title}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          {submessage}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.imageLayout}
        >
          <PageNotFound className={isMobile ? classes.imageMobile : classes.image} viewBox="0 0 496 496" />
        </Box>
      </Container>
    </Box>
  );
};

NotFound.propTypes = {
  title: PropTypes.string.isRequired,
  submessage: PropTypes.string.isRequired
};

NotFound.defaultProps = {};

export default NotFound;
