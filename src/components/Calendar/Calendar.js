import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  NavigateBeforeRounded as PreviousMonth,
  NavigateNextRounded as NextMonth
} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CalendarReact from "react-calendar";
// FIXME: Try to understand why the Calendar.module.css does not work

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  }
}));

const Calendar = ({
  daily,
  onChangeCalendar
}) => {
  const classes = useStyles();
  const [calendar, setCalendar] = useState(null);

  const infoDaily = (
    <Typography component="div" align="right" variant="caption">
      <strong>Day:</strong>
      {" "}
      Double click date
    </Typography>
  );

  const infoPeriod = (
    <>
      {infoDaily}
      <Typography component="div" align="right" variant="caption">
        <strong>Period:</strong>
        {" "}
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
  daily: false
};
export default Calendar;
