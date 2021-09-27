import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Loading from "../Loading";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  content: {
    height: "100%"
  }
}));

const LoadingBox = ({
  isLoading,
  children
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        {isLoading ? <Loading /> : children}
      </CardContent>
    </Card>
  );
};

LoadingBox.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default LoadingBox;
