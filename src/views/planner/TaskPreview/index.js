import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box, Card, CardHeader, Divider, makeStyles
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import nextId from 'react-id-generator';
import DailyTask from '../../../components/DailyTask';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TaskPreview = ({
  tasks, updateTaskHandler, deleteTaskHandler, className, ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Daily Tasks"
      />
      <Divider />
      <PerfectScrollbar>
        <Box m="10px" maxHeight={300}>
          {
            tasks.map((task) => (
              <DailyTask
                key={nextId()}
                task={task}
                updateTaskHandler={updateTaskHandler}
                deleteTaskHandler={deleteTaskHandler}
                enableDelete
                enableUpdate
              />
            ))
          }
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

TaskPreview.propTypes = {
  className: PropTypes.string,
  tasks: PropTypes.array,
  updateTaskHandler: PropTypes.func,
  deleteTaskHandler: PropTypes.func
};

export default TaskPreview;
