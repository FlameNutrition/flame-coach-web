import moment from "moment-timezone";

/**
 * Convert date string into a moment timezone instance
 *
 * @param {String} date string date
 * @returns {moment} instance with timezone
 */
export const convertDateToTimezoneInstance = (date) => {
  return moment(date);
};
