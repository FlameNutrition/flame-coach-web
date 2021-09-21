import moment from 'moment';
import { getTimeRangeDates } from '../../../utils/timeRangeUtil';

export const formatDateLabels = (listOfDates) => {
  const labels = [];

  listOfDates.forEach((date) => {
    const wrapperDate = moment(date);
    labels.push(wrapperDate.format('MM-DD'));
  });

  return labels;
};

export const maxTicksLimit = (timeFrame) => {
  switch (timeFrame) {
    case '1_WEEK':
      return 7;
    case '1_MONTH':
      return 4;
    case '2_MONTH':
      return 6;
    case '6_MONTH':
      return 6;
    default:
      return 7;
  }
};

export const maxTicksLimitMobile = (timeFrame) => {
  switch (timeFrame) {
    case '1_WEEK':
      return 7;
    case '1_MONTH':
      return 5;
    case '2_MONTH':
      return 4;
    case '6_MONTH':
      return 6;
    default:
      return 7;
  }
};

export const orderPerDate = (a, b) => {
  const dateA = a.date;
  const dateB = b.date;

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
};

export const filterWeightsPerTimeRange = (data, now, timeFrame) => {
  if (data === undefined) {
    return [];
  }

  const filterDates = getTimeRangeDates(timeFrame, now);

  const dataFiltered = [];

  data.forEach((data) => {
    const momentDate = moment(data.date, 'YYYY-MM-DD');
    if (momentDate.isBetween(filterDates.fromDttm, filterDates.toDttm, undefined, '[]')) {
      dataFiltered.push(data);
    }
  });

  dataFiltered.sort(orderPerDate);

  return dataFiltered;
};

export const minMaxValue = (data) => {
  let minValue = data.length === 0 ? 0 : data[0].value;
  let maxValue = data.length === 0 ? 0 : data[0].value;

  data.forEach((value) => {
    minValue = value.value < minValue ? value.value : minValue;
    maxValue = value.value > maxValue ? value.value : maxValue;
  });

  return {
    minValue: Math.floor(minValue),
    maxValue: Math.floor(maxValue)
  };
};

export default {
  formatDateLabels,
  maxTicksLimit,
  filterWeightsPerTimeRange,
  minMaxValue
};
