import React, { useEffect, useState } from 'react';
import {
  Box, Button,
  Container, Grid,
  makeStyles, SvgIcon
} from '@material-ui/core';
import Page from 'src/components/Page';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logger from 'loglevel';
import update from 'immutability-helper';
import MUIDataTable from 'mui-datatables';
import { UserMinus as UserMinusIcon, UserPlus as UserPlusIcon } from 'react-feather';
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

const CustomerListView = ({ coachIdentifier }) => {
  const classes = useStyles();
  const options = {
    filterType: 'dropdown',
    selectableRows: 'none',
    tableBodyMaxHeight: '70vh'
  };
  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: 'INFO'
  });

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

  useEffect(() => {
    if (customers === null) {
      getClientsCoachPlusClientsAvailableForCoaching(coachIdentifier)
        .then((response) => {
          const clients = response.data.clientsCoach
            .map((client) => ([
              `${client.firstname} ${client.lastname}`,
              client.email,
              client.registrationDate,
              getStatus(client.status),
              client
            ]));

          setLoading(false);
          setCustomers(clients);
        }).catch(() => {
          setLoading(false);
          setCustomers(null);
        });
    }
  }, []);

  const setGenericErrorMessage = () => {
    setNotification(update(notification,
      {
        enable: { $set: true },
        message: { $set: process.env.REACT_APP_MSG_SERVER_ERROR },
        level: { $set: 'ERROR' }
      }));
  };

  const setSpecificErrorMessage = (error) => {
    try {
      const errorLevel = error.response.status === 500 ? 'ERROR' : 'WARNING';
      const errorMessage = error.response.data.detail;
      setNotification(update(notification,
        {
          enable: { $set: true },
          message: { $set: errorMessage },
          level: { $set: errorLevel }
        }));
    } catch (ex) {
      logger.error('Exception:', ex);
      setGenericErrorMessage();
    }
  };

  const notificationHandler = () => {
    setNotification(update(notification,
      {
        enable: { $set: false }
      }));
  };

  const setClientStatus = (client, json) => {
    try {
      const index = customers.findIndex(
        (customer) => customer[4].identifier === client.identifier
      );
      setCustomers(update(customers, {
        [index]: {
          3: { $set: getStatus(json.data.status) },
          4: {
            status: { $set: json.data.status }
          }
        }
      }));
    } catch (ex) {
      logger.error('Exception:', ex);
      setGenericErrorMessage();
    }
  };

  const linkClientHandler = (client) => {
    enrollmentProcessInit(client.identifier, coachIdentifier)
      .then((response) => {
        setClientStatus(client, response);
      }).catch((error) => {
        setSpecificErrorMessage(error);
      });
  };

  const unlinkClientHandler = (client) => {
    enrollmentProcessBreak(client.identifier)
      .then((response) => {
        setClientStatus(client, response);
      }).catch((error) => {
        setSpecificErrorMessage(error);
      });
  };

  const columns = ['Name', 'Email', 'Registration date', 'Status', {
    label: 'Actions',
    filter: false,
    options: {
      customBodyRender: (value) => (
        <Grid
          container
          spacing="1"
        >
          <Grid item>
            <Button
              className={classes.plusUserButton}
              variant="contained"
              disabled={!(value.status === 'AVAILABLE')}
              onClick={() => linkClientHandler(value)}
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
              disabled={!(value.status !== 'AVAILABLE')}
              onClick={() => unlinkClientHandler(value)}
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
      )
    }
  }];

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          {customers !== null
            ? (
              <>
                <MUIDataTable
                  title="Clients list"
                  data={customers}
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
          {!loading && customers === null
            ? <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />
            : null}
        </Box>
      </Container>
    </Page>
  );
};

CustomerListView.propTypes = {
  coachIdentifier: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    coachIdentifier: state.auth.userInfo.identifier !== null
      ? state.auth.userInfo.identifier : null
  };
};

export default connect(mapStateToProps, null)(CustomerListView);
