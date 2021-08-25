import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Person as CoachIcon } from '@material-ui/icons';
import DashboardBox from '../../Core/DashboardBox';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  content: {
    height: '100%'
  }
}));

const MyCoach = ({
  coachName,
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
            COACH
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {coachName || 'N/A'}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <CoachIcon/>
          </Avatar>
        </Grid>
      </Grid>
    </DashboardBox>
  );
};

MyCoach.propTypes = {
  coachName: PropTypes.string,
  isLoading: PropTypes.bool
};

export default MyCoach;
