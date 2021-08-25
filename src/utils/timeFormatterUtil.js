export const displayFullTime = (date) => {

  if (date === null || date === undefined) {
    return 'N/A';
  }

  return date.format('dddd, MMMM Do YYYY, h:mm:ss a');
};

export const displayDate = (date) => {
  return date.format('dddd, MMMM Do YYYY');
};

export const displayTime = (date) => {
  return date.format('h:mm:ss a');
};
