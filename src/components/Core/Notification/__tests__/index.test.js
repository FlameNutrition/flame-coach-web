import React from 'react';
import sinon from 'sinon';
import { render, screen, cleanup, fireEvent } from '../../../../testing/test-utils';
import Notification from '../index';

describe('<Notification/ >', () => {

  afterEach(() => {
    cleanup();
  });

  it('Show info notification with collapse', () => {
    const { container } = render(
      <Notification
        collapse message="INFO MESSAGE" level="INFO"/>
    );

    expect(container)
      .toMatchSnapshot();
    expect(screen.queryByText('INFO MESSAGE'))
      .not
      .toBeNull();
    expect(screen.queryByLabelText('close'))
      .not
      .toBeNull();
  });

  it('Message should be "I like you"', () => {
    render(
      <Notification message="I like you" level="SUCCESS"/>
    );

    expect(screen.queryByText('I like you'))
      .not
      .toBeNull();
  });

  it('Close notification', () => {
    const openHandlerMock = sinon.spy();
    render(
      <Notification
        collapse
        open
        message="INFO MESSAGE"
        level="SUCCESS"
        openHandler={openHandlerMock}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(openHandlerMock)
      .toHaveBeenCalledOnce(1);
  });
});
