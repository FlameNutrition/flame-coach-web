import {
  Box, Card, makeStyles, Typography, useMediaQuery
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import UnderConstructionIcon from '../../icons/UnderConstruction';

const useStyles = makeStyles(() => ({
  root: {
    height: '80vh'
  },
  rootMobileSmall: {
    height: '100vh'
  },
  rootMobile: {
    height: '80vh'
  },
  imageLayout: {
    marginTop: '100px',
    width: '100%'
  },
  messageLayout: {
    marginTop: '30px',
    width: '100%'
  },
  message: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  submessage: {
    marginTop: '10px',
    paddingLeft: '20%',
    paddingRight: '20%',
  },
  imageMobile: {
    height: 'auto',
    width: '50%'
  },
  image: {
    height: '200pt',
    width: '200pt'
  }
}));

const WorkInProgress = ({ message, submessage }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallMobile = useMediaQuery('(max-height:800px)');

  let rootClass = classes.root;

  if (isMobile) {
    if (isSmallMobile) {
      rootClass = classes.rootMobileSmall;
    } else {
      rootClass = classes.rootMobile;
    }
  }

  return (
    <>
      <Card
        className={rootClass}
      >
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          flexDirection="row"
        >
          <Box
            display="flex"
            justifyContent="center"
            className={classes.imageLayout}
          >
            <UnderConstructionIcon className={isMobile ? classes.imageMobile : classes.image} viewBox="0 0 496 496" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className={classes.messageLayout}
          >
            <Typography
              variant="h3"
              align="center"
              className={classes.message}
            >
              {message}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              className={clsx(classes.message, classes.submessage)}
            >
              {submessage}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

WorkInProgress.propTypes = {
  message: PropTypes.string.isRequired,
  submessage: PropTypes.string
};

WorkInProgress.defaultProps = {};

export default WorkInProgress;
