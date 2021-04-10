import React from 'react';
import toJson from 'enzyme-to-json';
import { createMount, createRender, createShallow } from '@material-ui/core/test-utils';
import sinon from 'sinon';
import Notification from './index';

describe('<Notification/ >', () => {
  let shallow;
  let render;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    render = createRender();
    mount = createMount();
  });

  it('Show info notification', () => {
    const notification = shallow(
      <Notification message="INFO MESSAGE" level="INFO" />
    );

    expect(toJson(notification)).toMatchSnapshot();
  });

  it('Show warning notification', () => {
    const notification = shallow(
      <Notification message="INFO MESSAGE" level="WARNING" />
    );

    expect(toJson(notification)).toMatchSnapshot();
  });

  it('Show error notification', () => {
    const notification = shallow(
      <Notification message="INFO MESSAGE" level="ERROR" />
    );

    expect(toJson(notification)).toMatchSnapshot();
  });

  it('Show success notification', () => {
    const notification = shallow(
      <Notification message="INFO MESSAGE" level="SUCCESS" />
    );

    expect(toJson(notification)).toMatchSnapshot();
  });

  it('Show notification with collapse', () => {
    const notification = shallow(
      <Notification
        collapse
        message="INFO MESSAGE"
        level="SUCCESS"
      />
    );

    expect(toJson(notification)).toMatchSnapshot();
  });

  it('Message should be "I like you"', () => {
    const notification = shallow(
      <Notification message="I like you" level="SUCCESS" />
    );

    const message = notification.find({ itemID: 'notification' })
      .children()
      .text();

    expect(message).toEqual('I like you');
  });

  it('Close notification', () => {
    const openHandlerMock = sinon.spy();
    const notification = mount(
      <Notification
        collapse
        open
        message="INFO MESSAGE"
        level="SUCCESS"
        openHandler={openHandlerMock}
      />
    );

    const closedBtn = notification.find({ type: 'button' });

    closedBtn.simulate('click');

    expect(openHandlerMock).toHaveBeenCalledOnce();
  });
});
