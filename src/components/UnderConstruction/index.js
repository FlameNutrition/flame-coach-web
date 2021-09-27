import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import UnderConstructionIcon from "../../images/UnderConstruction";
import { useIsMediumMobile, useIsMobile } from "../../utils/mediaUtil";

const useStyles = makeStyles(() => ({
  root: {
    height: "80vh"
  },
  rootMobileSmall: {
    height: "100vh"
  },
  rootMobile: {
    height: "80vh"
  },
  imageLayout: {
    marginTop: "100px",
    width: "100%"
  },
  messageLayout: {
    marginTop: "30px",
    width: "100%"
  },
  message: {
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  submessage: {
    marginTop: "10px",
    paddingLeft: "20%",
    paddingRight: "20%"
  },
  imageMobile: {
    height: "auto",
    width: "50%"
  },
  image: {
    height: "200pt",
    width: "200pt"
  }
}));

const WorkInProgress = ({
  message,
  submessage
}) => {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const isMediumMobile = useIsMediumMobile();

  let rootClass = classes.root;

  if (isMobile) {
    if (isMediumMobile) {
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
            <UnderConstructionIcon className={isMobile ? classes.imageMobile : classes.image}
                                   viewBox="0 0 496 496" />
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
