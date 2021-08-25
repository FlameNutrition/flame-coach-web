import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';
import React, { useState } from 'react';

import ErrorMessage from '../../components/Core/Notification/ErrorMessage/ErrorMessage';
import InfoMessage from '../../components/Core/Notification/InfoMessage/InfoMessage';
import Page from '../../components/Page';
import Password from './Password';
import PropTypes from 'prop-types';
import { logError } from '../../logging';
import { updatePassword } from '../../api/axios';
import { useMutation } from 'react-query';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Settings = ({
  customerEmail
}) => {
  const classes = useStyles();

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
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
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
      </Container>
    </Page>
  );
};

Settings.propTypes = {
  customerEmail: PropTypes.string.isRequired
};

export default Settings;
