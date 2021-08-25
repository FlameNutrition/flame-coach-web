import { displayDate, displayFullTime, displayTime } from '../timeFormatterUtil';
import moment from 'moment-timezone';

describe('timeFormatterUtil tests', () => {

  it('test display full date time', () => {

    expect(displayFullTime(moment.tz('2013-11-18 11:55', 'America/Toronto')))
      .toEqual('Monday, November 18th 2013, 11:55:00 am');

  });

  it('test display date', () => {

    expect(displayDate(moment.tz('2013-11-18 11:55', 'America/Toronto')))
      .toEqual('Monday, November 18th 2013');

  });

  it('test display time', () => {

    expect(displayTime(moment.tz('2013-11-18 11:55', 'America/Toronto')))
      .toEqual('11:55:00 am');

  });

  it('test display full date time when date is null or undefined', () => {

    expect(displayFullTime(null))
      .toEqual('N/A');
    expect(displayFullTime(undefined))
      .toEqual('N/A');

  });
});
