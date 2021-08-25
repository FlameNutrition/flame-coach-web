import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

import { InsertChartOutlined as InsertChartIcon } from '@material-ui/icons';
import DashboardBox from '../../Core/DashboardBox';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  },
  content: {
    height: '100%'
  }
}));

const TasksProgress = ({
  progress,
  isLoading,
  type
}) => {
  const classes = useStyles();

  return (
    <DashboardBox isLoading={isLoading}>
      <>
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
              {type}
              {' '}
              PROGRESS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {progress}
              %
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon/>
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={progress}
            variant="determinate"
          />
        </Box>
      </>
    </DashboardBox>
  );
};

TasksProgress.propTypes = {
  type: PropTypes.string,
  progress: PropTypes.number,
  isLoading: PropTypes.bool
};

export default TasksProgress;
