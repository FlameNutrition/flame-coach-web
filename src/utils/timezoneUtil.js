import moment from 'moment-timezone';

//FIXME: Change this to use the timezone configured by user
const timezone = moment.tz.guess();

const getTimezoneDateTime = (date) => {
  return moment.tz(date, timezone);
};

export {
  timezone,
  getTimezoneDateTime
};
