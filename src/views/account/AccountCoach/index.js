import Grid from '@material-ui/core/Grid';
import update from 'immutability-helper';
import logger from 'loglevel';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getCoachContactInformation, updateCoachContactInformation } from '../../../api/axios';
import Notification from '../../../components/Core/Notification';
import ErrorMessage from '../../../components/Core/Notification/ErrorMessage/ErrorMessage';
import InfoMessage from '../../../components/Core/Notification/InfoMessage/InfoMessage';
import Page from '../../../components/Page';
import { logDebug, logError } from '../../../logging';
import Profile from '../Profile';
import ProfileDetails from '../ProfileDetails';

const Account = ({
  customerIdentifier,
  email
}) => {
  const queryClient = useQueryClient();

  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: 'INFO'
  });

  const resetNotificationHandler = () => {
    setNotification(update(notification,
      {
        enable: { $set: false }
      }));
  };

  const updateNotificationHandler = (enable, message, level) => {
    setNotification({
      enable,
      message,
      level
    });
  };

  const updateUserDetailsHandler = (event) => {
    let newValue = event.target.value;

    queryClient.setQueryData(['getContactInformation', customerIdentifier], (oldData) => {
      if (event.target.name === 'country') {
        logDebug('AccountCoach', 'updateUserDetailsHandler', 'Event Native:', event.nativeEvent.target);
        newValue = {
          value: event.nativeEvent.target.textContent,
          code: event.target.value.length === 0 ? null : event.target.value
        };
      }

      return {
        ...oldData,
        [event.target.name]: newValue
      };
    });
  };

  const updatePhotoHandler = () => {
    logger.debug('Update photo');
  };

  const contactInformation = useQuery(['getContactInformation', customerIdentifier],
    () => getCoachContactInformation(customerIdentifier), {
      onError: async (err) => {
        logError('AccountCoach',
          'useQuery getCoachContactInformation',
          'Error:', err);
      }
    });

  const updateContactInformation = useMutation(
    ({
      // eslint-disable-next-line no-shadow
      customerIdentifier,
      newContactInformation
    }) => updateCoachContactInformation(customerIdentifier, newContactInformation),
    {
      onError: (error) => {
        logError('AccountCoach', 'updateContactInformation', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: () => {
        const infoCode = InfoMessage.CODE_2001;
        updateNotificationHandler(true, infoCode.msg, infoCode.level);
      }
    }
  );

  const saveContactInformationHandler = () => {
    logDebug('AccountCoach', 'saveContactInformationHandler', 'Contact Information:', contactInformation.data);

    const newContactInformation = {
      firstName: contactInformation.data.firstName,
      lastName: contactInformation.data.lastName,
      phoneCode: contactInformation.data.phoneCode,
      phoneNumber: contactInformation.data.phoneNumber,
      countryCode: (contactInformation.data.country) ? contactInformation.data.country.code : null
    };

    updateContactInformation.mutate({
      customerIdentifier,
      newContactInformation
    });
  };

  return (
    <Page
      title="Account"
      isError={contactInformation.isError}
      isLoading={contactInformation.isFetching}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={4}
          md={6}
          xs={12}
        >
          <Profile
            user={contactInformation.data ? {
              city: '',
              country: (contactInformation.data.country)
                ? contactInformation.data.country.value : '',
              avatar: ''
            } : null}
            updatePhotoHandler={updatePhotoHandler}
          />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          <ProfileDetails
            userDetails={contactInformation.data ? {
              firstName: contactInformation.data.firstName,
              lastName: contactInformation.data.lastName,
              email,
              phoneCode: contactInformation.data.phoneCode,
              phoneNumber: contactInformation.data.phoneNumber,
              country: contactInformation.data.country && contactInformation.data.country.code
                ? contactInformation.data.country.code : '',
            } : null}
            saveContactInformationHandler={saveContactInformationHandler}
            updateUserDetailsHandler={updateUserDetailsHandler}
          />
          {notification.enable
            ? (
              <Notification
                collapse
                open={notification.enable}
                openHandler={resetNotificationHandler}
                level={notification.level}
                message={notification.message}
              />
            )
            : null}
        </Grid>
      </Grid>
    </Page>
  );
};

Account.propTypes = {
  customerIdentifier: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default Account;
