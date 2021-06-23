import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
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
  progress, isLoading, type, ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <CardContent className={classes.content}>
        {isLoading ? <Loading />
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
                    <InsertChartIcon />
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
