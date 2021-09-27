/**
 * Display full date using format 'dddd, MMMM Do YYYY, h:mm:ss a'
 * E.g: Tuesday, 28th October 2021, 12:00:00 pm
 *
 * @param {moment} date object
 * @returns {String} date using the date format 'dddd, MMMM Do YYYY, h:mm:ss a' otherwise N/A
 */
export const displayFullTime = (date) => {

  if (date === null || date === undefined) {
    return 'N/A';
  }

  return date.format('dddd, MMMM Do YYYY, h:mm:ss a');
};

/**
 * Display date using format 'YYYY/MM/DD' (slash)
 * E.g: 2021/10/28
 *
 * @param {moment} date object
 * @returns {String} date using the date format 'YYYY/MM/DD'
 */
export const displayDateWithSlash = (date) => {
  return date.format('YYYY/MM/DD');
};

/**
 * Display date using format 'YYYY-MM-DD' (dash)
 * E.g: 2021-10-28
 *
 * @param {moment} date object
 * @returns {String} date using the date format 'YYYY-MM-DD'
 */
export const displayDateWithDash = (date) => {
  return date.format('YYYY-MM-DD');
};

/**
 * Display date using format 'dddd, MMMM Do YYYY'
 * E.g: Tuesday, 28th October 2021
 *
 * @param {moment} date object
 * @returns {String} date using the date format 'dddd, MMMM Do YYYY'
 */
export const displayDate = (date) => {
  return date.format('dddd, MMMM Do YYYY');
};

/**
 * Display time using format 'h:mm:ss a'
 * E.g: 12:00:00 pm
 *
 * @param {moment} date object
 * @returns {String} date using the date format 'h:mm:ss a'
 */
export const displayTime = (date) => {
  return date.format('h:mm:ss a');
};

