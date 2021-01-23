import React, { useState } from 'react';
import clsx from 'clsx';
import logger from 'loglevel';
import PropTypes from 'prop-types';
import moment from 'moment';
import NextMonth from '@material-ui/icons/NavigateNextRounded';
import PreviousMonth from '@material-ui/icons/NavigateBeforeRounded';
import {
  Box, Card, CardContent, CardHeader, Divider, makeStyles
} from '@material-ui/core';
import Calendar from 'react-calendar';
// FIXME: Try to understand why the Calendar.module.css does not work
import './Calendar.css';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const [calendar, setCalendar] = useState(new Date());

  const handleChangeCalendar = (value) => {
    logger.info('Change the calendar date', moment(value));
    setCalendar(value);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Calendar" />
      <Divider />
      <CardContent>
        <Box
          position="relative"
        >
          <Calendar
            onChange={handleChangeCalendar}
            value={calendar}
            nextLabel={<NextMonth />}
            next2Label={null}
            prevLabel={<PreviousMonth />}
            prev2Label={null}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
