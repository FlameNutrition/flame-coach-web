import React from 'react';
import './Event.css';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import moment from 'moment';

const Event = ({
  date, value, measureType
}) => {
  return (
    <Paper
      className="complex-swipeable-list-item"
      variant="outlined"
      square
    >
      <div className="complex-swipeable-list-item-label">
        <span className="complex-swipeable-list-item-name">
          {value}
          {' '}
          {measureType}
        </span>
      </div>

      <div className="complex-swipeable-list-item-description">
        {moment(date).format('ddd, MMMM Do YYYY')}
      </div>

    </Paper>
  );
};

Event.propTypes = {
  date: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  measureType: PropTypes.string
};

Event.defaultProps = {
  measureType: 'kg'
};

export default Event;
