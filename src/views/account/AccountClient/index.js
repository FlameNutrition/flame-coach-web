import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import React, { useState } from 'react';
import {
  getClientContactInformation,
  updateClientContactInformation,
  updateClientPersonalData
} from '../../../api/axios';
import { logDebug, logError } from '../../../logging';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import ErrorMessage from '../../../components/Core/Notification/ErrorMessage/ErrorMessage';
import InfoMessage from '../../../components/Core/Notification/InfoMessage/InfoMessage';
import Notification from '../../../components/Core/Notification';
import Page from '../../../components/Page';
import Profile from '../Profile';
import ProfileDetails from '../ProfileDetails';
import PropTypes from 'prop-types';
import Warning from '../../../components/Warning';
import logger from 'loglevel';
import update from 'immutability-helper';
import { useFetchClientPersonalInformation } from '../../../api/client/useFetchClientPersonalInformation';
import Loading from '../../../components/Core/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    height: '100%'
  },
  container: {
    height: '100%'
  }
}));

const Account = ({
  customerIdentifier,
  email
}) => {
  const queryClient = useQueryClient();
  const classes = useStyles();

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

  const contactInformationFields = ['firstName', 'lastName', 'phoneCode', 'phoneNumber', 'country'];
  const personalDataFields = ['measureType', 'weight', 'height', 'gender'];

  const contactInformation = useQuery(['getContactInformation', customerIdentifier],
    () => getClientContactInformation(customerIdentifier), {
      onError: async (err) => {
        logError('AccountClient',
          'useQuery getClientContactInformation',
          'Error:', err);
      }
    });

  const updateContactInformation = useMutation(
    ({
      // eslint-disable-next-line no-shadow
      customerIdentifier,
      newContactInformation
    }) => updateClientContactInformation(customerIdentifier, newContactInformation),
    {
      onError: (error) => {
        logError('AccountClient', 'updateContactInformation', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: () => {
        const infoCode = InfoMessage.CODE_2001;
        updateNotificationHandler(true, infoCode.msg, infoCode.level);
      }
    }
  );

  const personalData = useFetchClientPersonalInformation(customerIdentifier);

  const updatePersonalData = useMutation(
    ({
      // eslint-disable-next-line no-shadow
      customerIdentifier,
      newPersonalData
    }) => updateClientPersonalData(customerIdentifier, newPersonalData),
    {
      onError: (error) => {
        logError('AccountClient', 'updatePersonalData', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: () => {
        const infoCode = InfoMessage.CODE_2002;
        updateNotificationHandler(true, infoCode.msg, infoCode.level);
      }
    }
  );

  const updateUserDetailsHandler = (event) => {
    logDebug('AccountClient', 'updateUserDetailsHandler', 'Event:', event.target);

    let newValue = event.target.value;

    if (contactInformationFields.includes(event.target.name)) {
      queryClient.setQueryData(['getContactInformation', customerIdentifier], (oldData) => {
        if (event.target.name === 'country') {
          logDebug('AccountClient', 'updateUserDetailsHandler', 'Event Native:', event.nativeEvent.target);
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
    }

    if (personalDataFields.includes(event.target.name)) {
      queryClient.setQueryData(['getClientPersonalData', customerIdentifier], (oldData) => {
        if (event.target.name === 'measureType' || event.target.name === 'gender') {
          logDebug('AccountClient', 'updateUserDetailsHandler', 'Event Native:', event.nativeEvent.target);
          newValue = {
            value: event.nativeEvent.target.textContent,
            code: event.target.value.length === 0 ? null : event.target.value
          };
        }

        if (event.target.name === 'weight' || event.target.name === 'height') {
          newValue = Number.isNaN(event.target.valueAsNumber) ? 0.0 : event.target.valueAsNumber;
        }

        return {
          ...oldData,
          [event.target.name]: newValue
        };
      });
    }
  };

  const updatePhotoHandler = () => {
    logger.debug('Update photo');
  };

  const saveContactInformationHandler = () => {
    logDebug('AccountClient', 'saveContactInformationHandler', 'Contact Information:', contactInformation.data);

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

  const savePersonalInformationHandler = () => {
    logDebug('AccountClient', 'savePersonalInformationHandler', 'Personal Information:', personalData.data);

    const newPersonalData = {
      weight: personalData.data.weight,
      height: personalData.data.height,
      genderCode: (personalData.data.gender) ? personalData.data.gender.code : null,
      measureTypeCode: personalData.data.measureType.code
    };

    updatePersonalData.mutate({
      customerIdentifier,
      newPersonalData
    });
  };

  let container = (<Loading size={100}/>);

  if (!contactInformation.isFetching && !contactInformation.isError
    && !personalData.isFetching && !personalData.isError) {
    container = (
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
            user={{
              city: '',
              country: (contactInformation.data.country)
                ? contactInformation.data.country.value : '',
              avatar: ''
            }}
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
            enablePersonalData
            userDetails={{
              firstName: contactInformation.data.firstName,
              lastName: contactInformation.data.lastName,
              email,
              phoneCode: contactInformation.data.phoneCode,
              phoneNumber: contactInformation.data.phoneNumber,
              country: contactInformation.data.country && contactInformation.data.country.code
                ? contactInformation.data.country.code : '',
              measureType: personalData.data.measureType.code,
              weight: personalData.data.weight,
              height: personalData.data.height,
              gender: personalData.data.gender && personalData.data.gender.code
                ? personalData.data.gender.code : ''
            }}
            saveContactInformationHandler={saveContactInformationHandler}
            savePersonalInformationHandler={savePersonalInformationHandler}
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
    );
  }

  if ((!contactInformation.isFetching && contactInformation.isError)
    || (!personalData.isFetching && personalData.isError)) {
    container = <Warning message={process.env.NEXT_PUBLIC_MSG_SERVER_ERROR}/>;
  }

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container
        className={classes.container}
        maxWidth="lg"
      >
        {container}
      </Container>
    </Page>
  );
};

Account.propTypes = {
  customerIdentifier: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default Account;
