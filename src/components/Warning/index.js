import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import clsx from "clsx";
import ConnectionError from "../../images/ConnectionError";
import { useIsMobile } from "../../utils/mediaUtil";

const useStyles = makeStyles(() => ({
  root: {
    height: "70vh"
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
  imageMobile: {
    height: "auto",
    width: "50%"
  },
  image: {
    height: "200pt",
    width: "200pt"
  }
}));

const Warning = ({ message }) => {
  const classes = useStyles();
  const isMobile = useIsMobile();

  return (
    <>
      <Card
        className={clsx(classes.root)}
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
            <ConnectionError className={isMobile ? classes.imageMobile : classes.image}
                             viewBox="0 0 496 496" />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.messageLayout}
          >
            <Typography
              variant="h4"
              align="center"
              className={classes.message}
            >
              {message}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

Warning.propTypes = {
  message: PropTypes.string.isRequired
};

Warning.defaultProps = {};

export default Warning;
