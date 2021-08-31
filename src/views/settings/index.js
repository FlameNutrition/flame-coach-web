import Box from '@material-ui/core/Box';
import React, { useState } from 'react';

import ErrorMessage from '../../components/Core/Notification/ErrorMessage/ErrorMessage';
import InfoMessage from '../../components/Core/Notification/InfoMessage/InfoMessage';
import Page from '../../components/Page';
import Password from './Password';
import PropTypes from 'prop-types';
import { logError } from '../../logging';
import { updatePassword } from '../../api/axios';
import { useMutation } from 'react-query';

const Settings = ({
  customerEmail
}) => {

  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: 'INFO'
  });

  const updateNotificationHandler = (enable, message, level) => {
    setNotification({
      enable,
      message,
      level
    });
  };

  const updatePasswordMutation = useMutation(({
    email,
    oldPassword,
    newPassword
  }) => updatePassword(email, oldPassword, newPassword));

  return (
    <Page
      title="Settings"
      isError={false}
      isLoading={false}
    >
      <Box>
        <Password
          notification={notification}
          updateNotificationHandler={updateNotificationHandler}
          updatePasswordHandler={(oldPassword, newPassword, newPasswordConfirmation) => {
            if (newPassword === newPasswordConfirmation) {
              updatePasswordMutation.mutate({
                email: customerEmail,
                oldPassword,
                newPassword
              }, {
                onError: async (error) => {
                  logError('Settings', 'updatePassword', 'Error Details:', error.response.data.detail);
                  const errorCode = ErrorMessage.fromCode(error.response.data.code);
                  updateNotificationHandler(true, errorCode.msg, errorCode.level);
                },
                onSuccess: async () => {
                  const infoCode = InfoMessage.CODE_2003;
                  updateNotificationHandler(true, infoCode.msg, infoCode.level);
                }
              });
            } else {
              const errorCode = ErrorMessage.CODE_0005;
              updateNotificationHandler(true, errorCode.msg, errorCode.level);
            }
          }}
        />
      </Box>
    </Page>
  );
};

Settings.propTypes = {
  customerEmail: PropTypes.string.isRequired
};

export default Settings;
