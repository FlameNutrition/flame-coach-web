import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { NavigateNextRounded as NextMonth, NavigateBeforeRounded as PreviousMonth } from '@material-ui/icons';
import {
  Box, Card, CardContent, CardHeader, Divider, makeStyles, Typography
} from '@material-ui/core';
import CalendarReact from 'react-calendar';
// FIXME: Try to understand why the Calendar.module.css does not work

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const Calendar = ({
  daily, onChangeCalendar
}) => {
  const classes = useStyles();
  const [calendar, setCalendar] = useState(null);

  const infoDaily = (
    <Typography component="div" align="right" variant="caption">
      <strong>Day:</strong>
      {' '}
      Double click date
    </Typography>
  );

  const infoPeriod = (
    <>
      {infoDaily}
      <Typography component="div" align="right" variant="caption">
        <strong>Period:</strong>
        {' '}
        Select a start and end date
      </Typography>
    </>
  );

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardHeader title="Calendar" />
      <Divider />
      <CardContent>
        <Box>
          <CalendarReact
            onChange={(value) => {
              setCalendar(value);
              onChangeCalendar(value);
            }}
            selectRange={!daily}
            value={calendar}
            nextLabel={<NextMonth />}
            next2Label={null}
            returnValue="range"
            prevLabel={<PreviousMonth />}
            prev2Label={null}
          />
        </Box>
        <Box>
          {!daily ? infoPeriod : null}
        </Box>
      </CardContent>
    </Card>
  );
};

Calendar.propTypes = {
  daily: PropTypes.bool,
  onChangeCalendar: PropTypes.func.isRequired
};

Calendar.defaultProps = {
  daily: false,
};
export default Calendar;
