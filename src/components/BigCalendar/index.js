import { Calendar, Views } from 'react-big-calendar';

import PropTypes from 'prop-types';
import React from 'react';
import { useIsMobile } from '../../utils/mediaUtil';

const scrollTime = new Date(1970, 1, 1, 6);
const calendarNormalView = [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA];
const calendarMobileView = [Views.MONTH, Views.DAY, Views.AGENDA];

const BigCalendar = ({
  events,
  selectSlotHandler,
  doubleClickSlotHandler,
  localizer,
  ...rest
}) => {

  const isMobile = useIsMobile();

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultView={Views.DAY}
      scrollToTime={scrollTime}
      views={isMobile ? calendarMobileView : calendarNormalView}
      onSelectSlot={selectSlotHandler}
      onDoubleClickEvent={doubleClickSlotHandler}
      {...rest}
    />
  );

};

BigCalendar.propTypes = {
  events: PropTypes.array.isRequired,
  localizer: PropTypes.object.isRequired,
  selectSlotHandler: PropTypes.func.isRequired,
  doubleClickSlotHandler: PropTypes.func.isRequired
};

export default BigCalendar;
