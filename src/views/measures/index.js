import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import React, { useState } from 'react';

import Page from '../../components/Page';
import WeightChart from '../../components/Charts/WeightChart';
import Events from '../../components/Charts/Events';
import { filterWeightsPerTimeRange } from '../../components/Charts/utils/chartUtil';
import moment from 'moment';
import Filters from '../../components/Charts/Filters';
import { useQueryClient } from 'react-query';
import { logError } from '../../logging';
import PropTypes from 'prop-types';
import Notification from '../../components/Core/Notification';
import update from 'immutability-helper';
import ErrorMessage from '../../components/Core/Notification/ErrorMessage/ErrorMessage';
import InfoMessage from '../../components/Core/Notification/InfoMessage/InfoMessage';
import { useFetchWeightClient } from '../../api/measures/useFetchWeightClient';
import { useAddWeightClient } from '../../api/measures/useAddWeightClient';
import { useDeleteWeightClient } from '../../api/measures/useDeleteWeightClient';
import { useFetchClientPersonalInformation } from '../../api/client/useFetchClientPersonalInformation';
import { extractWeightType } from '../../api/client/clientPersonalInformationUtil';
import { useIsMobile } from '../../utils/mediaUtil';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: '100%'
  },
  weightGraphicCardContent: {
    height: '400px'
  },
  weightGraphicMobileCardContent: {
    height: '400px',
    marginBottom: '35px'
  },
  eventsCardContent: {
    height: '400px'
  },
  filtersCardContent: {
    height: '400px'
  },
  container: {
    height: '100%'
  }
}));

const MeasuresView = ({
  customerIdentifier
}) => {
  const classes = useStyles();

  const queryClient = useQueryClient();

  const isMobile = useIsMobile();

  const [timeFrameWeight, setTimeFrameWeight] = useState('1_MONTH');
  const [dateWeightAdding, setDateWeightAdding] = useState(moment()
    .utc());
  const [weightAdding, setWeightAdding] = useState(NaN);

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

  const personalData = useFetchClientPersonalInformation(customerIdentifier);
  const {
    isLoading,
    isError,
    data
  } = useFetchWeightClient(customerIdentifier);
  const { mutate: mutateAddWeight } = useAddWeightClient();
  const { mutate: mutateDeleteWeight } = useDeleteWeightClient();

  const filteredData = filterWeightsPerTimeRange(data, moment()
    .utc(), timeFrameWeight);

  const addWeightHandler = (weight, date) => {
    if (Number.isNaN(weight)) {
      const errorMessage = ErrorMessage.CODE_0006;
      updateNotificationHandler(true, errorMessage.msg, errorMessage.level);
    } else if (date === null) {
      const errorMessage = ErrorMessage.CODE_0007;
      updateNotificationHandler(true, errorMessage.msg, errorMessage.level);
    } else {
      mutateAddWeight({
        customerIdentifier,
        weight,
        utcDate: date
      }, {
        onError: (error) => {
          logError('Measures',
            'useMutation addNewWeight',
            'Error:', error.response);

          logError('Measures', 'useMutation addNewWeight', 'Error Details:', error.response.data.detail);
          const errorCode = ErrorMessage.fromCode(error.response.data.code);
          updateNotificationHandler(true, errorCode.msg, errorCode.level);
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['getWeightClient', customerIdentifier]);

          const successMessage = InfoMessage.CODE_0002;
          updateNotificationHandler(true, successMessage.msg, successMessage.level);
        }
      });
    }
  };

  const deleteWeightHandler = (event) => {
    mutateDeleteWeight({
      customerIdentifier,
      identifier: event.identifier
    }, {
      onError: (error) => {
        logError('Measures',
          'useMutation deleteHandler',
          'Error:', error.response);

        logError('Measures', 'useMutation deleteHandler', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getWeightClient', customerIdentifier]);
      }
    });
  };

  return (
    <Page
      title="Measures"
      isError={isError || personalData.isError}
      isLoading={isLoading || personalData.isLoading}
    >
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
                    className={isMobile ? classes.weightGraphicMobileCardContent
                      : classes.weightGraphicCardContent}
                    isMobile={isMobile}
                    timeFrame={timeFrameWeight}
                    dataChart={filteredData}
                    measureUnit={extractWeightType(personalData.data.measureType.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <Events
                    className={classes.eventsCardContent}
                    dataEvents={filteredData}
                    onDeleteHandle={deleteWeightHandler}
                    measureUnit={extractWeightType(personalData.data.measureType.value)}
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
    </Page>
  );
};

MeasuresView.propTypes = {
  customerIdentifier: PropTypes.string.isRequired
};

export default MeasuresView;
