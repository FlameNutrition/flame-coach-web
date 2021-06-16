import {
  Button,
  Container,
  Grid,
  SvgIcon,
  makeStyles, Card, Box, CardContent, TextField, Typography, MuiThemeProvider
} from '@material-ui/core';
import React, { useState } from 'react';
import { UserMinus as UserMinusIcon, Send as SendIcon } from 'react-feather';
import {
  enrollmentProcessBreak,
  getClientsCoachPlusClientsAvailableForCoaching
} from '../../api/axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import ErrorMessage from '../../components/Notification/ErrorMessage/ErrorMessage';
import MUIDataTable from 'mui-datatables';
import Notification from '../../components/Notification';
import Page from '../../components/Page';
import PropTypes from 'prop-types';
import Warning from '../../components/Warning';
import { logError } from '../../logging';
import update from 'immutability-helper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useInviteClient } from '../../api/client/useInviteClient';
import InfoMessage from '../../components/Notification/InfoMessage/InfoMessage';
import themeTable from './themeTable';
import clsx from 'clsx';
import { useIsMediumMobile } from '../../utils/mediaUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  sendCard: {
    display: 'flex',
  },
  sendInviteButton: {
    marginLeft: '5px',
    marginTop: '16px',
    height: '56px',
    backgroundColor: theme.palette.button.success
  },
  minusUserButton: {
    backgroundColor: theme.palette.button.dangerous
  },
  // Note: this using the following solution: https://github.com/gregnb/mui-datatables/issues/400#issuecomment-681998044
  rightTableHead: {
    '& > div': {
      textAlign: 'right',
      paddingRight: '15px'
    }
  },
  actionColumnTable: {
    paddingRight: '12px'
  }
}));

const validationSchema = Yup
  .object({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
  });

const CustomersView = ({ customerIdentifier }) => {
  const classes = useStyles();
  const isMobile = useIsMediumMobile();

  const options = {
    filterType: 'dropdown',
    selectableRows: 'none',
    tableBodyMaxHeight: '70vh',
    sortOrder: {
      name: 'Name',
      direction: 'asc'
    },
    print: false
  };
  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: 'INFO'
  });

  const queryClient = useQueryClient();

  const [clientLoading, setClientLoading] = useState(false);
  const [isClientLoading, setIsClientLoading] = useState(null);

  const { mutate: inviteClient } = useInviteClient();

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

  const formikSendInviteClient = useFormik({
    initialValues: {
      email: ''
    },

    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      inviteClient({
        coachIdentifier: customerIdentifier,
        clientEmail: values.email
      }, {
        onError: (error) => {
          logError('Customer',
            'useMutation inviteClient',
            'Error:', error.response);

          logError('Customer', 'useMutation inviteClient', 'Error Details:', error.response.data.detail);
          const errorCode = ErrorMessage.fromCode(error.response.data.code);
          updateNotificationHandler(true, errorCode.msg, errorCode.level);
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(['getClientsCoachPlusClientsAvailableForCoaching', customerIdentifier]);

          const successMessage = data.registrationInvite ? InfoMessage.CODE_0004
            : InfoMessage.CODE_0003;

          updateNotificationHandler(true, successMessage.msg, successMessage.level);
        }
      });
    }
  });

  const {
    isLoading,
    isError,
    data
  } = useQuery(['getClientsCoachPlusClientsAvailableForCoaching', customerIdentifier],
    () => getClientsCoachPlusClientsAvailableForCoaching(customerIdentifier), {
      onError: async (err) => {
        logError('Customer',
          'useQuery getClientsCoachPlusClientsAvailableForCoaching',
          'Error:', err);
      },
      select: (data) => {
        const filteredClients = data.clientsCoach.filter((client) => client.status === 'PENDING'
          || client.status === 'ACCEPTED');

        return {
          identifier: data.identifier,
          clientsCoach: filteredClients
        };
      }
    });

  const unlinkClient = useMutation(
    ({
      clientIdentifier,
      // eslint-disable-next-line no-unused-vars
      coachIdentifier
    }) => enrollmentProcessBreak(clientIdentifier),
    {
      onMutate: async ({ clientIdentifier }) => {
        setClientLoading(clientIdentifier);
        setIsClientLoading(true);
        resetNotificationHandler();
      },
      onError: async (error) => {
        logError('Customer',
          'useMutation enrollmentProcessBreak',
          'Error:', error.response);
        setIsClientLoading(false);

        logError('Customer', 'useMutation enrollmentProcessBreak', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: async (data, variables) => {
        await queryClient.cancelQueries(['getClientsCoachPlusClientsAvailableForCoaching', variables.coachIdentifier]);

        queryClient.setQueryData(['getClientsCoachPlusClientsAvailableForCoaching', customerIdentifier], (oldData) => {
          const index = oldData.clientsCoach.findIndex(
            (customer) => customer.identifier === variables.clientIdentifier
          );

          return update(oldData, {
            clientsCoach: {
              [index]: {
                status: { $set: data.status }
              }
            }
          });
        });

        setIsClientLoading(false);
      }
    }
  );

  const unlinkClientHandler = (client) => {
    unlinkClient.mutate({
      clientIdentifier: client.identifier,
      coachIdentifier: customerIdentifier
    });
  };

  const getStatus = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'Available';
      case 'PENDING':
        return 'Pending';
      case 'ACCEPTED':
        return 'My client';
      default:
        return 'Unknown';
    }
  };

  const columnActions = {
    label: 'Actions',
    options: {
      filter: false,
      sort: false,
      setCellHeaderProps: () => {
        return {
          className: clsx({
            [classes.rightTableHead]: true
          })
        };
      },
      customBodyRender: (value) => {
        const disableButtonMinus = value.client.identifier === value.clientLoading
          ? value.isClientLoading || !(value.client.status !== 'AVAILABLE')
          : !(value.client.status !== 'AVAILABLE');

        return (
          <Grid
            container
            justify={isMobile ? 'flex-start' : 'flex-end'}
            spacing={1}
            className={clsx({
              [classes.actionColumnTable]: true
            })}
          >
            <Grid item>
              <Button
                className={classes.minusUserButton}
                variant="contained"
                disabled={disableButtonMinus}
                onClick={() => unlinkClientHandler(value.client)}
              >
                <SvgIcon
                  fontSize="small"
                  color="inherit"
                >
                  <UserMinusIcon />
                </SvgIcon>
              </Button>
            </Grid>
          </Grid>
        );
      }
    }
  };

  const columns = ['Name', 'Email', 'Registration date', 'Status', columnActions];

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        {!isLoading && !isError
          ? (
            <Grid
              direction="row"
              container
            >
              <Grid item xs={12}>
                <Box marginBottom={2}>
                  <form onSubmit={formikSendInviteClient.handleSubmit}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Send Invite
                        </Typography>
                        <Box className={classes.sendCard}>
                          <TextField
                            error={Boolean(formikSendInviteClient.errors.email)}
                            fullWidth
                            helperText={formikSendInviteClient.errors.email}
                            label="Email"
                            margin="normal"
                            name="email"
                            onBlur={formikSendInviteClient.handleBlur}
                            onChange={formikSendInviteClient.handleChange}
                            value={formikSendInviteClient.values.email}
                            variant="outlined"
                          />
                          <Button
                            className={classes.sendInviteButton}
                            variant="contained"
                            type="submit"
                            disabled={Boolean(formikSendInviteClient.errors.email)}
                          >
                            <SvgIcon
                              fontSize="small"
                              color="inherit"
                            >
                              <SendIcon />
                            </SvgIcon>
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </form>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <MuiThemeProvider theme={themeTable}>
                  <MUIDataTable
                    title="Clients List"
                    data={data.clientsCoach.map((client) => ([
                      `${client.firstname} ${client.lastname}`,
                      client.email,
                      client.registrationDate,
                      getStatus(client.status),
                      {
                        client,
                        clientLoading,
                        isClientLoading
                      },
                    ]))}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>
              </Grid>
              {notification.enable
                ? (
                  <Grid item xs={12}>
                    <Notification
                      collapse
                      open={notification.enable}
                      openHandler={resetNotificationHandler}
                      level={notification.level}
                      message={notification.message}
                    />
                  </Grid>
                )
                : null}
            </Grid>
          )
          : null}
        {!isLoading && isError
          ? <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />
          : null}
      </Container>
    </Page>
  );
};

CustomersView.propTypes = {
  customerIdentifier: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    customerIdentifier: state.auth.userInfo.identifier !== null
      ? state.auth.userInfo.identifier : null
  };
};

export { CustomersView, mapStateToProps };
