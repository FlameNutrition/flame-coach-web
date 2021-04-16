import Calendar from './Calendar';
import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';

describe('<Calendar/ >', () => {
  let shallow;
  let wrapper;
  const changeCalenderHandlerSpy = sinon.spy();
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    wrapper = shallow(
      <Calendar onChangeCalendar={changeCalenderHandlerSpy} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Show daily selection calendar', () => {
    const calendar = shallow(
      <Calendar
        daily
        onChangeCalendar={changeCalenderHandlerSpy}
      />
    );

    expect(toJson(calendar)).toMatchSnapshot();
  });

  it('Show multiple selection calendar with lable', () => {
    expect(toJson(wrapper)).toMatchSnapshot();

    const labelBox = wrapper.find('WithStyles(ForwardRef(Typography))');

    expect(labelBox.first().text()).toEqual('Day: Double click date');
    expect(labelBox.last().text()).toEqual('Period: Select a start and end date');
  });

  it('Change date handler', () => {
    wrapper.find('Calendar').props().onChange();

    expect(changeCalenderHandlerSpy).toHaveBeenCalledOnce();
  });
});
