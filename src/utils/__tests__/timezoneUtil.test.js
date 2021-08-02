import { getTimezoneDateTime } from '../timezoneUtil';
import moment from 'moment';

jest.mock('@material-ui/core', () => ({
  useMediaQuery: jest.fn()
}));

describe('timezoneUtil tests', () => {
  it('test convert timezone', async () => {

    const date = moment('2021-04-14T23:00:00');

    const result = getTimezoneDateTime(date);

    expect('2021-04-14T23:00:00+01:00')
      .toEqual(result.format());
  });
});
