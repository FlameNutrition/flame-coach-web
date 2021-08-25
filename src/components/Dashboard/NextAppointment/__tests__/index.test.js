import React from 'react';
import { render, screen } from '../../../../testing/test-utils';
import NextAppointment from '../index';
import moment from 'moment-timezone';

describe('<NextAppoinment / >', () => {

  it('Show next appointment box when date is not null', () => {
    render(<NextAppointment
      isLoading={false}
      date={moment.tz('2013-11-18 11:55', 'America/Toronto')}
    />);

    expect(screen.queryByText('Monday, November 18th 2013'))
      .not
      .toBeNull();
    expect(screen.queryByText('11:55:00 am'))
      .not
      .toBeNull();
    expect(screen.queryByText('NEXT APPOINTMENT'))
      .not
      .toBeNull();
  });

  it('Show next appointment box when date is null', () => {
    render(<NextAppointment
      isLoading={false}
      date={null}
    />);

    expect(screen.queryByText('N/A'))
      .not
      .toBeNull();
    expect(screen.queryByText('NEXT APPOINTMENT'))
      .not
      .toBeNull();
  });

});
