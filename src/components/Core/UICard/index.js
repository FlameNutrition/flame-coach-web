import clsx from "clsx";
import PropTypes from "prop-types";
import Loading from "../Loading";

import { Card, CardContent, Typography } from "@material-ui/core";
import { useStyles } from "./style";

const UICard = ({
  isLoading,
  title,
  children
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        {isLoading ? <Loading size={50} /> :
          <>
            <Typography className={classes.title} gutterBottom variant="h3" component="h2">
              {title}
            </Typography>
            {children}
          </>
        }
      </CardContent>
    </Card>
  );
};

UICard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

UICard.defaultProps = {
  isLoading: false
};

export default UICard;
