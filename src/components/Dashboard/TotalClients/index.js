import PropTypes from "prop-types";
import { colors, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { People as ClientsIcon } from "@material-ui/icons";
import DashboardBox from "../../Core/DashboardBox";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  avatar: {
    backgroundColor: colors.amber[500],
    height: 56,
    width: 56
  },
  content: {
    height: "100%"
  }
}));

const TotalClients = ({
  total,
  isLoading
}) => {
  const classes = useStyles();

  return (
    <DashboardBox isLoading={isLoading}>
      <Grid
        container
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TOTAL CLIENTS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {total}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <ClientsIcon />
          </Avatar>
        </Grid>
      </Grid>
    </DashboardBox>
  );
};

TotalClients.propTypes = {
  total: PropTypes.number,
  isLoading: PropTypes.bool.isRequired
};

TotalClients.defaultProps = {
  total: 0
};

export default TotalClients;
