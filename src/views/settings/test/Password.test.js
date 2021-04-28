import {
  fireEvent,
  render,
  screen,
  waitFor
} from '../../../testing/test-utils';

import Password from '../Password';
import React from 'react';

describe('<Password / >', () => {
  const updateNotificationHandler = jest.fn();
  const submitHandler = jest.fn();

  it('render component', async () => {
    const { container } = render(
      <Password
        notification={{
          enable: false,
          message: '',
          level: 'INFO'
        }}
        updateNotificationHandler={updateNotificationHandler}
        updatePasswordHandler={submitHandler}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('change input boxes', async () => {
    const { container } = render(
      <Password
        notification={{
          enable: false,
          message: '',
          level: 'INFO'
        }}
        updateNotificationHandler={updateNotificationHandler}
        updatePasswordHandler={submitHandler}
      />
    );

    const inputOldPassword = container.querySelector('input[name=oldPassword]');
    const inputNewPassword = container.querySelector('input[name=newPassword]');
    const inputNewPasswordConfirmation = container.querySelector('input[name=newPasswordConfirmation]');

    expect(inputOldPassword).not.toBeNull();
    expect(inputNewPassword).not.toBeNull();
    expect(inputNewPasswordConfirmation).not.toBeNull();

    fireEvent.change(inputOldPassword, {
      target: { value: 'OLD PASSWORD' }
    });

    fireEvent.change(inputNewPassword, {
      target: { value: 'NEW PASSWORD' }
    });

    fireEvent.change(inputNewPasswordConfirmation, {
      target: { value: 'CONFIRM PASSWORD' }
    });

    await waitFor(() => {
      expect(inputOldPassword).toHaveAttribute('value', 'OLD PASSWORD');
      expect(inputNewPassword).toHaveAttribute('value', 'NEW PASSWORD');
      expect(inputNewPasswordConfirmation).toHaveAttribute('value', 'CONFIRM PASSWORD');
    });
  });

  it('show notification with collapse', async () => {
    const { container } = render(
      <Password
        notification={{
          enable: true,
          message: 'This is a simple notification',
          level: 'INFO'
        }}
        updateNotificationHandler={updateNotificationHandler}
        updatePasswordHandler={submitHandler}
      />
    );

    expect(screen.queryByText('This is a simple notification')).not.toBeNull();

    const btnCollapse = container.querySelector('button[type="button"]');
    expect(btnCollapse).not.toBeNull();

    fireEvent.click(btnCollapse);

    await waitFor(() => {
      expect(updateNotificationHandler).toHaveBeenCalledTimes(1);
    });
  });

  // FIXME: Why this doesn't work???...
  // when found a way to test this it's important to test the errors validations
  it.skip('submit btn action', async () => {
    render(
      <Password
        notification={{
          enable: false,
          message: '',
          level: 'INFO'
        }}
        updateNotificationHandler={updateNotificationHandler}
        updatePasswordHandler={submitHandler}
      />
    );

    const btn = screen.getByRole('button');

    fireEvent.click(btn);

    await waitFor(() => {
      expect(submitHandler).toHaveBeenCalledTimes(1);
    }, {
      timeout: 4000
    });
  });
});
