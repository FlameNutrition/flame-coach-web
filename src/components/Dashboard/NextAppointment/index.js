import PropTypes from "prop-types";
import { colors, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { displayDate, displayTime } from "../../../utils/displayDateTimeUtil";
import DashboardBox from "../../Core/DashboardBox";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  avatar: {
    backgroundColor: colors.indigo[500],
    height: 56,
    width: 56
  },
  content: {
    height: "100%"
  }
}));

const NextAppointment = ({
  date,
  name,
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
            NEXT APPOINTMENT
          </Typography>
          {date ?
            <>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {displayDate(date)}
              </Typography>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {displayTime(date)}
              </Typography>
            </>
            :
            <Typography
              color="textPrimary"
              variant="h5"
            >
              N/A
            </Typography>
          }
          {name ?
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {name}
            </Typography>
            : null
          }
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <ScheduleIcon />
          </Avatar>
        </Grid>
      </Grid>
    </DashboardBox>
  );
};

NextAppointment.propTypes = {
  date: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string
};

NextAppointment.defaultProps = {
  date: null,
  name: null
};

export default NextAppointment;
