import moment from 'moment-timezone';

//FIXME: Change this to use the timezone configured by user
const defaultTimezone = moment.tz.guess();

/**
 * Add timezone to date instance
 *
 * @param {moment} date without timezone
 * @returns {moment} with default timezone
 */
const getDefaultTimezoneDateTime = (date) => {
  return getTimezoneDateTime(date, defaultTimezone);
};

/**
 * Add timezone to date instance
 *
 * @param {moment} date without timezone
 * @param {String} timezone to be added
 * @returns {moment} with default timezone
 */
const getTimezoneDateTime = (date, timezone= defaultTimezone) => {
  return moment.tz(date, timezone);
};

export {
  defaultTimezone,
  getTimezoneDateTime,
  getDefaultTimezoneDateTime
};
