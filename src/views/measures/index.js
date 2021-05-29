import {
  Container, Grid, makeStyles, useMediaQuery
} from '@material-ui/core';
import React, { useState } from 'react';

import Page from '../../components/Page';
import WeightChart from '../../components/Charts/WeightChart';
import Events from '../../components/Charts/Events';
import { filterWeightsPerTimeRange } from '../../components/Charts/utils/chartUtil';
import moment from 'moment';
import Filters from '../../components/Charts/Filters';
import { useMutation, useQueryClient } from 'react-query';
import { addWeightClient, deleteWeightClient } from '../../api/axios';
import { logError } from '../../logging';
import PropTypes from 'prop-types';
import Warning from '../../components/Warning';
import Notification from '../../components/Notification';
import update from 'immutability-helper';
import ErrorMessage from '../../components/Notification/ErrorMessage/ErrorMessage';
import InfoMessage from '../../components/Notification/InfoMessage/InfoMessage';
import { fetchWeightClient } from '../../api/measures/fetchWeightClient';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  weightGraphicCardContent: {
    height: '400px'
  },
  eventsCardContent: {
    height: '400px'
  },
  filtersCardContent: {
    height: '400px'
  },
}));

const MeasuresView = ({
  clientIdentifier
}) => {
  const classes = useStyles();

  const queryClient = useQueryClient();

  const isMobile = useMediaQuery('(max-width:600px)');

  const [timeFrameWeight, setTimeFrameWeight] = useState('1_WEEK');
  const [dateWeightAdding, setDateWeightAdding] = useState(moment().utc());
  const [weightAdding, setWeightAdding] = useState(0.0);

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

  const notificationHandler = () => {
    setNotification(update(notification,
      {
        enable: { $set: false }
      }));
  };

  const { isLoading, isError, data } = fetchWeightClient(clientIdentifier);

  const filteredData = filterWeightsPerTimeRange(data, moment().utc(), timeFrameWeight);

  const addNewWeight = useMutation(
    ({
      customerIdentifier,
      weight,
      utcDate
    }) => addWeightClient(customerIdentifier, weight, utcDate),
    {
      onError: async (error) => {
        logError('Measures',
          'useMutation addNewWeight',
          'Error:', error.response);

        logError('Measures', 'useMutation addNewWeight', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getWeightClient', clientIdentifier]);

        const successMessage = InfoMessage.CODE_0002;
        updateNotificationHandler(true, successMessage.msg, successMessage.level);
      }
    }
  );

  const deleteWeight = useMutation(
    ({
      customerIdentifier,
      eventIdentifier
    }) => deleteWeightClient(customerIdentifier, eventIdentifier),
    {
      onError: async (error) => {
        logError('Measures',
          'useMutation deleteWeight',
          'Error:', error.response);

        logError('Measures', 'useMutation deleteWeight', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getWeightClient', clientIdentifier]);
      }
    }
  );

  const addWeightHandler = (weight, date) => {
    addNewWeight.mutate({
      customerIdentifier: clientIdentifier,
      weight,
      utcDate: date
    });
  };

  const deleteHandler = (event) => {
    deleteWeight.mutate({
      customerIdentifier: clientIdentifier,
      eventIdentifier: event.identifier
    });
  };

  return (
    <Page
      className={classes.root}
      title="Measures"
    >
      <Container
        maxWidth={false}
      >
        {!isLoading && !isError
          ? (
            <Grid
              container
              spacing={1}
              direction="row"
            >
              <Grid
                item
                xs={12}
                md={9}
              >
                <Grid
                  container
                  spacing={1}
                  direction="column"
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <Grid container spacing={1}>
                      <Grid item md={9} xs={12}>
                        <WeightChart
                          className={isMobile ? null : classes.weightGraphicCardContent}
                          isMobile={isMobile}
                          timeFrame={timeFrameWeight}
                          dataChart={filteredData}
                          measureUnit="Kg"
                        />
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <Events
                          className={classes.eventsCardContent}
                          dataEvents={filteredData}
                          onDeleteHandle={deleteHandler}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
              >
                <Filters
                  className={isMobile ? null : classes.filtersCardContent}
                  enableAddingWeight
                  timeFrame={timeFrameWeight}
                  onChangeTimeFrameHandler={(newTimeFrame) => setTimeFrameWeight(newTimeFrame)}
                  date={dateWeightAdding}
                  onChangeDateHandler={(newDate) => setDateWeightAdding(newDate)}
                  weight={weightAdding}
                  onChangeWeightHandler={(newWeight) => setWeightAdding(newWeight)}
                  onAddWeightHandler={addWeightHandler}
                />
              </Grid>
              {notification.enable
                ? (
                  <Grid
                    item
                    xs={12}
                    md={9}
                  >
                    <Notification
                      collapse
                      open={notification.enable}
                      openHandler={notificationHandler}
                      level={notification.level}
                      message={notification.message}
                    />
                  </Grid>
                )
                : null}
            </Grid>
          ) : null}
        {!isLoading && isError
          ? <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />
          : null}
      </Container>
    </Page>
  );
};

MeasuresView.propTypes = {
  clientIdentifier: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    clientIdentifier: state.auth.userInfo.identifier !== null
      ? state.auth.userInfo.identifier : null
  };
};

export { MeasuresView, mapStateToProps };
