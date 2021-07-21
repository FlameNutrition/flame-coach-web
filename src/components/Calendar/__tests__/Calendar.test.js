import Calendar from '../Calendar';
import React from 'react';
import sinon from 'sinon';
import { render, screen } from '../../../testing/test-utils';

describe('<Calendar />', () => {

  const changeCalenderHandlerSpy = sinon.spy();

  afterEach(() => {
    jest.clearAllMocks();
    //cleanup();
  });

  it('Show multiple selection calendar with labels', () => {

    const { container } = render(
      <Calendar
        daily={false}
        onChangeCalendar={changeCalenderHandlerSpy}
      />
    );

    expect(container)
      .toMatchSnapshot();

    expect(screen.queryByText('Calendar'))
      .not
      .toBeNull();
    expect(screen.queryByText('Day:'))
      .not
      .toBeNull();
    expect(screen.queryByText('Double click date'))
      .not
      .toBeNull();
    expect(screen.queryByText('Period:'))
      .not
      .toBeNull();
    expect(screen.queryByText('Select a start and end date'))
      .not
      .toBeNull();

  });

  it('Show daily selection calendar', () => {

    render(
      <Calendar
        daily
        onChangeCalendar={changeCalenderHandlerSpy}
      />
    );

    expect(screen.queryByText('Day:'))
      .toBeNull();
    expect(screen.queryByText('Double click date'))
      .toBeNull();
    expect(screen.queryByText('Period:'))
      .toBeNull();
    expect(screen.queryByText('Select a start and end date'))
      .toBeNull();
  });

});
