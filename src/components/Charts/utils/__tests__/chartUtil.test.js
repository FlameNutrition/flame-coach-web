import {
  filterWeightsPerTimeRange,
  formatDateLabels,
  maxTicksLimit, maxTicksLimitMobile, minMaxValue,
} from '../chartUtil';

import moment from 'moment';

describe('chartUtil tests', () => {
  it('test format labels with date output', async () => {
    const listOfDates = [
      moment('2021-05-08', 'YYYY-MM-DD')
        .toDate(),
      moment('2021-05-09', 'YYYY-MM-DD')
        .toDate(),
      moment('2021-05-10', 'YYYY-MM-DD')
        .toDate(),
      moment('2021-05-11', 'YYYY-MM-DD')
        .toDate(),
    ];

    const result = formatDateLabels(listOfDates);

    expect(result)
      .toHaveLength(4);
    expect(result)
      .toStrictEqual([
        '05-08',
        '05-09',
        '05-10',
        '05-11'
      ]);
  });

  it('test max ticks labels limit based on time frame', async () => {
    expect(maxTicksLimit('1_WEEK'))
      .toEqual(7);
    expect(maxTicksLimit('1_MONTH'))
      .toEqual(4);
    expect(maxTicksLimit('2_MONTH'))
      .toEqual(6);
    expect(maxTicksLimit('6_MONTH'))
      .toEqual(6);
    expect(maxTicksLimit('OTHER'))
      .toEqual(7);
  });

  it('test max ticks labels limit based on time frame for mobile', async () => {
    expect(maxTicksLimitMobile('1_WEEK'))
      .toEqual(7);
    expect(maxTicksLimitMobile('1_MONTH'))
      .toEqual(5);
    expect(maxTicksLimitMobile('2_MONTH'))
      .toEqual(4);
    expect(maxTicksLimitMobile('6_MONTH'))
      .toEqual(6);
    expect(maxTicksLimitMobile('OTHER'))
      .toEqual(7);
  });

  it('test filter data based on time frame', async () => {
    const data = [
      {
        date: '2021-05-13',
        value: 76.3
      },
      {
        date: '2021-05-20',
        value: 76.3
      },
      {
        date: '2021-05-21',
        value: 76.3
      },
      {
        date: '2021-05-12',
        value: 76.3
      },
      {
        date: '2021-05-18',
        value: 76.3
      }
    ];

    const today = moment('2021-05-20T23:00:00.000Z');

    const result = filterWeightsPerTimeRange(data, today, '1_WEEK');

    expect(result)
      .toHaveLength(3);
    expect(result)
      .toStrictEqual([{
        date: '2021-05-13',
        value: 76.3
      }, {
        date: '2021-05-18',
        value: 76.3
      }, {
        date: '2021-05-20',
        value: 76.3
      }]);
  });

  it('test min and max weight', async () => {
    const data = [
      {
        data: '2021-05-13',
        value: 70.5
      },
      {
        data: '2021-05-20',
        value: 80.6
      },
      {
        data: '2021-05-21',
        value: 60.4
      },
      {
        data: '2021-05-12',
        value: 100.3
      },
      {
        data: '2021-05-18',
        value: 50.4
      }
    ];

    const result = minMaxValue(data);

    expect(result)
      .toStrictEqual({
        minWeight: 50,
        maxWeight: 100
      });
  });
});
