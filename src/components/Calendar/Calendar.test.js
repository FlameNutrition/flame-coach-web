import React from 'react';
import toJson from 'enzyme-to-json';
import { createShallow } from '@material-ui/core/test-utils';
import sinon from 'sinon';
import Calendar from './Calendar';

describe('<Calendar/ >', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('Show daily selection calendar', () => {
    const changeCalenderHandler = sinon.spy();

    const calendar = shallow(
      <Calendar
        daily
        onChangeCalendar={changeCalenderHandler}
      />
    );

    expect(toJson(calendar)).toMatchSnapshot();
  });

  it('Show multiple selection calendar', () => {
    const changeCalenderHandler = sinon.spy();

    const calendar = shallow(
      <Calendar onChangeCalendar={changeCalenderHandler} />
    );

    expect(toJson(calendar)).toMatchSnapshot();

    const labelBox = calendar.find('WithStyles(ForwardRef(Typography))');

    console.log(labelBox.debug());
  });
});
