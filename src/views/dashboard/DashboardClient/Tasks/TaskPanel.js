import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    paddingLeft: '10px'
  }
}));

const TaskPanel = ({
  children, value, index, ...other
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`task-tabpanel-${index}`}
      aria-labelledby={`task-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children }
          {' '}
        </>
      )}
    </div>
  );
};

TaskPanel.propTypes = {
  children: PropTypes.object,
  value: PropTypes.string,
  index: PropTypes.number
};

export default TaskPanel;
