import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

import { InsertChartOutlined as InsertChartIcon } from '@material-ui/icons';
import Loading from '../../../components/Loading';

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
  type,
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
            <>
              <Grid
                container
                justify="space-between"
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
          )}
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  type: PropTypes.string,
  progress: PropTypes.number,
  isLoading: PropTypes.bool
};

export default TasksProgress;
