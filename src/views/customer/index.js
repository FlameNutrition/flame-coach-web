import React, { useState } from 'react';
import {
  Box, Button,
  Container, Grid,
  makeStyles, SvgIcon
} from '@material-ui/core';
import Page from 'src/components/Page';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import MUIDataTable from 'mui-datatables';
import { UserMinus as UserMinusIcon, UserPlus as UserPlusIcon } from 'react-feather';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Warning from '../../components/Warning';
import {
  enrollmentProcessBreak,
  enrollmentProcessInit,
  getClientsCoachPlusClientsAvailableForCoaching
} from '../../axios';
import Notification from '../../components/Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  },
  plusUserButton: {
    backgroundColor: theme.palette.button.success
  },
  minusUserButton: {
    backgroundColor: theme.palette.button.dangerous
  },
}));

const CustomersView = ({ coachIdentifier }) => {
  const classes = useStyles();
  const options = {
    filterType: 'dropdown',
    selectableRows: 'none',
    tableBodyMaxHeight: '70vh',
    sortOrder: {
      name: 'Name',
      direction: 'asc'
    }
  };
  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: 'INFO'
  });

  const queryClient = useQueryClient();

  const [clientLoading, setClientLoading] = useState(false);
  const [isClientLoading, setIsClientLoading] = useState(null);

  const {
    isLoading,
    isError,
    data
  } = useQuery(['getClientsCoachPlusClientsAvailableForCoaching', coachIdentifier],
    () => getClientsCoachPlusClientsAvailableForCoaching(coachIdentifier));

  const linkClientMutation = useMutation(
    ({
      client,
      // eslint-disable-next-line no-shadow
      coachIdentifier
    }) => enrollmentProcessInit(client.identifier, coachIdentifier),
    {
      onMutate: async ({ client }) => {
        setClientLoading(client.identifier);
        setIsClientLoading(true);
      },
      onSuccess: async (data, variables) => {
        await queryClient.cancelQueries(['getClientsCoachPlusClientsAvailableForCoaching', variables.coachIdentifier]);

        queryClient.setQueryData(['getClientsCoachPlusClientsAvailableForCoaching', coachIdentifier], (oldDate) => {
          const index = oldDate.clientsCoach.findIndex(
            (customer) => customer.identifier === variables.client.identifier
          );

          return update(oldDate, {
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

  const unlinkClientMutation = useMutation(
    ({
      client,
      // eslint-disable-next-line no-shadow,no-unused-vars
      coachIdentifier
    }) => enrollmentProcessBreak(client.identifier),
    {
      onMutate: async ({ client }) => {
        setClientLoading(client.identifier);
        setIsClientLoading(true);
      },
      onSuccess: async (data, variables) => {
        await queryClient.cancelQueries(['getClientsCoachPlusClientsAvailableForCoaching', variables.coachIdentifier]);

        queryClient.setQueryData(['getClientsCoachPlusClientsAvailableForCoaching', coachIdentifier], (oldDate) => {
          const index = oldDate.clientsCoach.findIndex(
            (customer) => customer.identifier === variables.client.identifier
          );

          return update(oldDate, {
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

  const linkClientHandler = (client) => {
    linkClientMutation.mutate({
      client,
      coachIdentifier
    });
  };

  const unlinkClientHandler = (client) => {
    unlinkClientMutation.mutate({
      client,
      coachIdentifier
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

  const notificationHandler = () => {
    setNotification(update(notification,
      {
        enable: { $set: false }
      }));
  };

  const columns = ['Name', 'Email', 'Registration date', 'Status', {
    label: 'Actions',
    filter: false,
    options: {
      customBodyRender: (value) => {
        const disableButtonPlus = value.client.identifier === value.clientLoading
          ? value.isClientLoading || !(value.client.status === 'AVAILABLE')
          : !(value.client.status === 'AVAILABLE');

        const disableButtonMinus = value.client.identifier === value.clientLoading
          ? value.isClientLoading || !(value.client.status !== 'AVAILABLE')
          : !(value.client.status !== 'AVAILABLE');

        return (
          <Grid
            container
            spacing={1}
          >
            <Grid item>
              <Button
                className={classes.plusUserButton}
                variant="contained"
                disabled={disableButtonPlus}
                onClick={() => linkClientHandler(value.client)}
              >
                <SvgIcon
                  fontSize="small"
                  color="inherit"
                >
                  <UserPlusIcon />
                </SvgIcon>
              </Button>
            </Grid>
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
  }];

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          {!isLoading && !isError
            ? (
              <>
                <MUIDataTable
                  title="Clients list"
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
                {notification.enable
                  ? (
                    <Notification
                      collapse
                      open={notification.enable}
                      openHandler={notificationHandler}
                      level={notification.level}
                      message={notification.message}
                    />
                  )
                  : null}
              </>
            )
            : null}
          {!isLoading && isError && data === null
            ? <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />
            : null}
        </Box>
      </Container>
    </Page>
  );
};

CustomersView.propTypes = {
  coachIdentifier: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    coachIdentifier: state.auth.userInfo.identifier !== null
      ? state.auth.userInfo.identifier : null
  };
};

export default connect(mapStateToProps, null)(CustomersView);
