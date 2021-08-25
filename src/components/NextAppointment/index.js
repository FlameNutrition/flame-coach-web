import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, colors, Grid, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import Loading from '../Loading';
import moment from 'moment-timezone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { displayDate, displayTime } from '../../utils/timeFormatterUtil';

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
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <CardContent className={classes.content}>
        {isLoading ? <Loading/>
          : (
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
          )}
      </CardContent>
    </Card>
  );
};

NextAppointment.propTypes = {
  date: PropTypes.objectOf(moment).isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default NextAppointment;
