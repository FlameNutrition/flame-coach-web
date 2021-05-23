import { getTimeRange, getTimeRangeDates } from '../timeRangeUtil';
import moment from 'moment';

describe('timeRangeUtil tests', () => {
  it('test get time frame range for 1 week', async () => {
    const today = moment.utc('2021-04-14T23:00:00.000Z');
    const result = getTimeRange('1_WEEK', today);

    expect(result)
      .toHaveLength(7);
    expect(result)
      .toStrictEqual([
        '2021-04-08T23:00:00.000Z',
        '2021-04-09T23:00:00.000Z',
        '2021-04-10T23:00:00.000Z',
        '2021-04-11T23:00:00.000Z',
        '2021-04-12T23:00:00.000Z',
        '2021-04-13T23:00:00.000Z',
        '2021-04-14T23:00:00.000Z',
      ]);
  });

  it('test get time frame range for 1 week in the start of month', async () => {
    const today = moment('2021-05-02T23:00:00.000Z');
    const result = getTimeRange('1_WEEK', today);

    expect(result)
      .toHaveLength(7);
    expect(result)
      .toStrictEqual([
        '2021-04-26T23:00:00.000Z',
        '2021-04-27T23:00:00.000Z',
        '2021-04-28T23:00:00.000Z',
        '2021-04-29T23:00:00.000Z',
        '2021-04-30T23:00:00.000Z',
        '2021-05-01T23:00:00.000Z',
        '2021-05-02T23:00:00.000Z',
      ]);
  });

  it('test get time frame range for 1 month', async () => {
    const today = moment('2021-05-01T23:00:00.000Z');

    const result = getTimeRange('1_MONTH', today);

    expect(result).toHaveLength(30);
    expect(result[0]).toStrictEqual('2021-04-02T23:00:00.000Z');
    expect(result[result.length - 1]).toStrictEqual('2021-05-01T23:00:00.000Z');
  });

  it('test get time frame range for 2 month', async () => {
    const today = moment('2021-05-01T23:00:00.000Z');

    const result = getTimeRange('2_MONTH', today);

    expect(result).toHaveLength(61);
    expect(result[0]).toStrictEqual('2021-03-03T00:00:00.000Z');
    expect(result[result.length - 1]).toStrictEqual('2021-05-01T23:00:00.000Z');
  });

  it('test get time frame range for 6 month', async () => {
    const today = moment('2021-05-01T23:00:00.000Z');

    const result = getTimeRange('6_MONTH', today);

    expect(result).toHaveLength(181);
    expect(result[0]).toStrictEqual('2020-11-03T00:00:00.000Z');
    expect(result[result.length - 1]).toStrictEqual('2021-05-01T23:00:00.000Z');
  });

  it('test get time frame dates for 1 week', async () => {
    const today = moment('2021-05-01T23:00:00.000Z');

    const result = getTimeRangeDates('1_WEEK', today);

    expect(result).toStrictEqual({
      toDttm: '2021-05-01',
      fromDttm: '2021-04-24'
    });
  });

  it('test get time frame dates for 1 month', async () => {
    const today = moment('2021-05-01T23:00:00.000Z');

    const result = getTimeRangeDates('1_MONTH', today);

    expect(result).toStrictEqual({
      toDttm: '2021-05-01',
      fromDttm: '2021-04-01'
    });
  });

  it('test get time frame dates for 2 month', async () => {
    const today = moment('2021-05-01T23:00:00.000Z');

    const result = getTimeRangeDates('2_MONTH', today);

    expect(result).toStrictEqual({
      toDttm: '2021-05-01',
      fromDttm: '2021-03-01'
    });
  });

  it('test get time frame dates for 6 month', async () => {
    const today = moment('2021-05-01T23:00:00.000Z');

    const result = getTimeRangeDates('6_MONTH', today);

    expect(result).toStrictEqual({
      toDttm: '2021-05-01',
      fromDttm: '2020-11-01'
    });
  });
});
