import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import logger from 'loglevel';
import {
  Box,
  Card, CardHeader, Divider, makeStyles, MenuItem, Select
} from '@material-ui/core';
import DailyTask from '../../../../components/DailyTask';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Tasks = ({ className, ...rest }) => {
  const classes = useStyles();
  const [tasks] = useState([
    {
      taskId: 1,
      taskTitle: 'Drink 3L of water',
      taskDescription: 'A simple description',
      taskTicked: false
    },
    {
      taskId: 2,
      taskTitle: 'Measure',
      taskDescription: 'A simple description',
      taskTicked: false
    }
  ]);
  const [taskType, setTaskType] = useState('today');

  const handleTaskType = (value) => {
    logger.info('New task type value:', value);
    setTaskType(value.target.value);
  };

  const checkTaskHandler = (task, value) => {
    logger.info('Tick the task');
    logger.info('Task', task);
    logger.info('New value', value);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Daily Tasks"
        action={(
          <Select
            name="type"
            onChange={handleTaskType}
            value={taskType}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="thisWeek">This week</MenuItem>
            <MenuItem value="lastWeek">Last week</MenuItem>
          </Select>
        )}
      />
      <Divider />
      <Box p="10px">
        {
        tasks.map((task) => (
          <DailyTask
            task={task}
            enableCheck
            checkTaskHandler={checkTaskHandler}
          />
        ))
      }
      </Box>
    </Card>
  );
};

Tasks.propTypes = {
  className: PropTypes.string,
  tasks: PropTypes.array
};

export default Tasks;
