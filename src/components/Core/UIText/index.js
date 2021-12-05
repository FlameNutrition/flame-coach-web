import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import { useStyles } from "./style";

const UIText = ({
  padding,
  children,
}) => {

  const classes = useStyles({ padding });

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
  padding: PropTypes.string,
  children: PropTypes.node.isRequired
};

UIText.defaultProps = {
  padding: '15px',
  isLoading: false
};

export default UIText;
