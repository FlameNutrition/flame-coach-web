import React from 'react';
import PropTypes from 'prop-types';
import { Views, Calendar } from 'react-big-calendar';

const BigCalendar = ({ localizer }) => {

  return (<Calendar
    selectable
    localizer={localizer}
    events={this.state.events}
    defaultView={Views.WEEK}
    scrollToTime={new Date(1970, 1, 1, 6)}
    defaultDate={new Date(2015, 3, 12)}
    onSelectEvent={event => alert(event.title)}
    dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
  />);

};

BigCalendar.propTypes = {
  localizer: PropTypes.object.isRequired,
};

export default BigCalendar;
