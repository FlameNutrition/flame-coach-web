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
      return 8;
    case '1_MONTH':
      return 10;
    case '2_MONTH':
      return 8;
    case '6_MONTH':
      return 5;
    default:
      return 8;
  }
};

export const filterWeightsPerTimeRange = (data, now, timeFrame) => {
  const filterDates = getTimeRangeDates(timeFrame, now);

  const dataFiltered = [];

  data.forEach((data) => {
    const momentDate = moment(data.date, 'YYYY-MM-DD');
    if (momentDate.isBetween(filterDates.fromDttm, filterDates.toDttm, undefined, '[]')) {
      dataFiltered.push({
        x: momentDate.format('MM-DD'),
        y: data.value
      });
    }
  });

  dataFiltered.sort((a, b) => {
    const dateA = a.x;
    const dateB = b.x;

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  });

  return dataFiltered;
};

export const minMaxWeight = (formattedData) => {
  let minWeight = formattedData.length === 0 ? 0 : formattedData[0].y;
  let maxWeight = formattedData.length === 0 ? 0 : formattedData[0].y;

  formattedData.forEach((data) => {
    minWeight = data.y < minWeight ? data.y : minWeight;
    maxWeight = data.y > maxWeight ? data.y : maxWeight;
  });

  return {
    minWeight: Math.floor(minWeight),
    maxWeight: Math.floor(maxWeight)
  };
};

export default {
  formatDateLabels,
  maxTicksLimit,
  filterWeightsPerTimeRange,
  minMaxWeight
};
