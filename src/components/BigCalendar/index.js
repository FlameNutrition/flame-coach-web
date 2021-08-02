import { Calendar, momentLocalizer, Views } from 'react-big-calendar';

import PropTypes from 'prop-types';
import React, { Children } from 'react';
import { useIsMobile } from '../../utils/mediaUtil';
import { logInfo } from '../../logging';
import moment from 'moment-timezone';

const scrollTime = new Date(1970, 1, 1, 6);
const calendarNormalView = [Views.MONTH, Views.WEEK, Views.DAY];
const calendarMobileView = [Views.MONTH, Views.DAY];

const TouchCellWrapper = ({
  children,
  value,
  onSelectSlot
}) =>
  React.cloneElement(Children.only(children), {
    onTouchEnd: () => onSelectSlot({
      action: 'click',
      slots: [value]
    }),
    style: {
      className: `${children}`
    }
  });

const BigCalendar = ({
  events,
  selectSlotHandler,
  doubleClickSlotHandler,
  localizer,
  view,
  ...rest
}) => {

  const isMobile = useIsMobile();

  const onSelectSlot = ({
    action,
    slots
  }) => {

    if (action === 'click') {
      logInfo('BigCalendar', 'onSelectSlot', 'clicked calendar slot', slots);
    } else {
      logInfo('BigCalendar', 'onSelectSlot', 'selected calendar slot', slots);
    }

    selectSlotHandler(slots);
    return false;
  };

  const onDoubleClickEvent = (event) => {
    logInfo('BigCalendar', 'onSelectSlot', 'clicked calendar event', event);
    doubleClickSlotHandler(event);
  };

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      defaultView={view}
      scrollToTime={scrollTime}
      views={isMobile ? calendarMobileView : calendarNormalView}
      onSelectSlot={onSelectSlot}
      onDoubleClickEvent={onDoubleClickEvent}
      components={{
        // eslint-disable-next-line react/display-name
        dateCellWrapper: (props) => (
          <TouchCellWrapper {...props} onSelectSlot={onSelectSlot}/>
        )
      }}
      {...rest}
    />
  );

};

BigCalendar.propTypes = {
  events: PropTypes.array.isRequired,
  localizer: PropTypes.object,
  selectSlotHandler: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  doubleClickSlotHandler: PropTypes.func.isRequired
};

BigCalendar.defaultProps = {
  localizer: momentLocalizer(moment)
};

export default BigCalendar;
