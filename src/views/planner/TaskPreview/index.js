import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box, Card, CardHeader, Divider, makeStyles
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import nextId from 'react-id-generator';
import moment from 'moment';
import DailyTask from '../../../components/DailyTask';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TaskPreview = ({
  tasks, date, selectUpdateTaskHandler, deleteTaskHandler, className, ...rest
}) => {
  const classes = useStyles();

  const stringDate = date.format(moment.HTML5_FMT.DATE);

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
              (task.date === stringDate)
                ? (
                  <DailyTask
                    key={nextId()}
                    task={task}
                    updateTaskHandler={selectUpdateTaskHandler}
                    deleteTaskHandler={deleteTaskHandler}
                    enableDelete
                    enableUpdate
                  />
                )
                : null
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
  date: PropTypes.object,
  selectUpdateTaskHandler: PropTypes.func,
  deleteTaskHandler: PropTypes.func
};

export default TaskPreview;
