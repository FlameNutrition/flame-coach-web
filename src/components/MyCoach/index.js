import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { colors } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { FitnessCenter as CoachIcon } from '@material-ui/icons';
import Loading from '../Loading';

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
          )}
      </CardContent>

    </Card>
  );
};

MyCoach.propTypes = {
  coachName: PropTypes.string,
  isLoading: PropTypes.bool
};

export default MyCoach;
