import PropTypes from 'prop-types';
import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import moment from 'moment-timezone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { displayDate, displayTime } from '../../../utils/timeFormatterUtil';
import DashboardBox from '../../Core/DashboardBox';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[500],
    height: 56,
    width: 56
  },
  content: {
    height: '100%'
  }
}));

const NextAppointment = ({
  date,
  isLoading,
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
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <ScheduleIcon/>
          </Avatar>
        </Grid>
      </Grid>
    </DashboardBox>
  );
};

NextAppointment.propTypes = {
  date: PropTypes.objectOf(moment).isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default NextAppointment;
