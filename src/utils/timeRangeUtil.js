import moment from 'moment';

const getTimeRangePerWeek = (toDttm) => {
  const timeRange = [toDttm.toISOString()];

  for (let index = 1; index < 7; index++) {
    timeRange.push(toDttm.subtract(1, 'days').toISOString());
  }

  return timeRange.reverse();
};

const getTimeRangePerMonth = (toDttm, numOfMonths) => {
  const timeRange = [toDttm.toISOString()];

  const lastDay = moment(toDttm).subtract(numOfMonths, 'month');
  const duration = moment.duration(toDttm.diff(lastDay)).asDays();

  for (let index = 1; index < duration; index++) {
    timeRange.push(toDttm.subtract(1, 'days').toISOString());
  }

  return timeRange.reverse();
};

const getTimeRangeWeek = (toDttm) => {
  return {
    toDttm: toDttm.utc().format('YYYY-MM-DD'),
    fromDttm: toDttm.subtract(7, 'days').utc().format('YYYY-MM-DD')
  };
};

const getTimeRangeMonth = (toDttm, numOfMonths) => {
  return {
    toDttm: toDttm.utc().format('YYYY-MM-DD'),
    fromDttm: toDttm.subtract(numOfMonths, 'months').utc().format('YYYY-MM-DD')
  };
};

const getTimeRange = (type, toDttm) => {
  switch (type) {
    case '1_WEEK':
      return getTimeRangePerWeek(toDttm);
    case '1_MONTH':
      return getTimeRangePerMonth(toDttm, 1);
    case '2_MONTH':
      return getTimeRangePerMonth(toDttm, 2);
    case '6_MONTH':
      return getTimeRangePerMonth(toDttm, 6);
    default:
      throw new Error('Unsupported time frame range');
  }
};

const getTimeRangeDates = (type, toDttm) => {
  switch (type) {
    case '1_WEEK':
      return getTimeRangeWeek(toDttm);
    case '1_MONTH':
      return getTimeRangeMonth(toDttm, 1);
    case '2_MONTH':
      return getTimeRangeMonth(toDttm, 2);
    case '6_MONTH':
      return getTimeRangeMonth(toDttm, 6);
    default:
      throw new Error('Unsupported time frame range');
  }
};

export {
  getTimeRange,
  getTimeRangeDates
};
