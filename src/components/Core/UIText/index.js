import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import { useStyles } from "./style";

const UIText = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.text}
      component="div"
      align="left" variant="body1">
      {children}
    </Typography>
  );
};

UIText.propTypes = {
  children: PropTypes.node.isRequired
};

UIText.defaultProps = {
  isLoading: false
};

export default UIText;
