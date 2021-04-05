import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { Alert } from '@material-ui/lab';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import update from 'immutability-helper';
import TasksProgress from './TasksProgress';
import Tasks from './Tasks';
import MyCoach from '../../../components/MyCoach';
import NextSession from '../../../components/NextSession';
import { logDebug, logError } from '../../../logging';
import { getDailyTasksByClientAndDay, updateDailyTaskByUUID } from '../../../axios';
import Warning from '../../../components/Warning';
import Notification from '../../../components/Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = ({ customerIdentifier }) => {
  const queryClient = useQueryClient();

  const classes = useStyles();

  const [nextSession] = useState(null);
  const [coach] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [taskPeriod, setTaskPeriod] = useState('today');
  const [tasksProgress, setTaskProgress] = useState(0);

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

  const clientTasks = useQuery(['getDailyTasksByClientAndDay', customerIdentifier, startDate, endDate],
    () => getDailyTasksByClientAndDay(customerIdentifier, startDate, endDate), {
      onError: async (err) => {
        logError('DashboardClient',
          'useQuery getDailyTasksByClientAndDay',
          'Error:', err);
      }
    });

  const progressPercentage = () => {
    if (!clientTasks.data || !clientTasks.data.dailyTasks) {
      return 0.0;
    }
    const listOfDailyTasks = clientTasks.data.dailyTasks;
    const numberOfDailyTasks = listOfDailyTasks.length;

    logDebug('DashboardClient', 'progressPercentage', 'numberOfDailyTasks', numberOfDailyTasks);

    const numberOfDailyTasksTicked = listOfDailyTasks
      .filter((dailyTask) => dailyTask.ticked).length;

    if (numberOfDailyTasksTicked === 0) {
      return 0.0;
    }

    logDebug('DashboardClient', 'progressPercentage', 'numberOfDailyTasksTicked', numberOfDailyTasksTicked);

    const result = (numberOfDailyTasksTicked * 100) / numberOfDailyTasks;

    logDebug('DashboardClient', 'progressPercentage', 'total', result);

    return result % 1 === 0 ? result : result.toFixed(1);
  };

  useEffect(() => {
    if (!clientTasks.isLoading && clientTasks.data) {
      setTaskProgress(progressPercentage());
    }
  });

  useEffect(() => {
    if (startDate && endDate) {
      clientTasks.refetch();
    }
  }, [startDate, endDate]);

  const updateDailyTask = useMutation(
    ({
      taskIdentifier,
      newTask
    }) => updateDailyTaskByUUID(taskIdentifier, newTask),
    {
      onError: async (error) => {
        logError('DashboardClient',
          'updateDailyTaskMutation',
          'Error:', error);

        const message = error.response.data.detail;
        const level = error.response.data.status === 500 ? 'ERROR' : 'WARNING';

        updateNotificationHandler(true, message, level);
      },
      onSuccess: async (data, variables) => {
        await queryClient.cancelQueries(['getDailyTasksByClientAndDay', customerIdentifier, startDate, endDate]);

        logDebug('Planner',
          'DashboardClient',
          'Response:', data);

        queryClient.setQueryData(['getDailyTasksByClientAndDay', customerIdentifier, startDate, endDate], (oldData) => {
          logDebug('Planner',
            'DashboardClient',
            'Old Data:', oldData);
          const index = oldData.dailyTasks.findIndex(
            (dailyTask) => dailyTask.identifier === variables.taskIdentifier
          );

          // FIXME: The undefined values should be deleted
          const newData = update(oldData, {
            dailyTasks: {
              [index]: { $set: data.dailyTasks[0] }
            }
          });

          logDebug('Planner',
            'DashboardClient',
            'New Data:', newData);

          return newData;
        });
      }
    }
  );

  const progressLabel = () => {
    switch (taskPeriod) {
      case 'today': return 'TODAY';
      case 'thisWeek': return 'THIS WEEK';
      case 'lastWeek': return 'LAST WEEK';
      case 'nextWeek': return 'NEXT WEEK';
      default: return 'TODAY';
    }
  };

  const updateTaskHandler = (task, event) => {
    const newDailyTask = {
      name: task.taskName,
      description: task.taskDescription,
      date: task.date,
      ticked: event.target.checked
    };

    updateDailyTask.mutate({
      taskIdentifier: task.identifier,
      newTask: newDailyTask
    });
  };

  const taskPeriodRefreshHandler = () => {
    clientTasks.refetch();
  };

  const taskPeriodHandler = (event) => {
    logDebug('Dashboard', 'taskPeriodHandler', 'value', event.target.value);
    setTaskPeriod(event.target.value);
    const now = moment();
    let initDate; let
      finalDate;

    switch (event.target.value) {
      case 'today': {
        const today = now.toDate();
        initDate = today;
        finalDate = today;
        break;
      }
      case 'thisWeek': {
        initDate = now.startOf('week').toDate();
        finalDate = now.endOf('week').toDate();
        break;
      }
      case 'lastWeek': {
        const firstDayOfWeek = now.startOf('week');
        initDate = moment(firstDayOfWeek).subtract(7, 'days').toDate();
        finalDate = moment(firstDayOfWeek).subtract(1, 'days').toDate();
        break;
      }
      case 'nextWeek': {
        const firstDayOfWeek = now.startOf('week');
        initDate = moment(firstDayOfWeek).add(7, 'days').toDate();
        finalDate = moment(firstDayOfWeek).add(13, 'days').toDate();
        break;
      }
      default: {
        const today = now.toDate();
        initDate = today;
        finalDate = today;
        break;
      }
    }

    logDebug('Dashboard', 'taskPeriodHandler', 'date range', initDate, finalDate);
    setStartDate(initDate);
    setEndDate(finalDate);
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        {!clientTasks.isLoading && clientTasks.isError
          ? <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />
          : (
            <>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <TasksProgress type={progressLabel(taskPeriod)} progress={tasksProgress} />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <MyCoach coachName={coach} />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <NextSession date={nextSession} />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Alert
                    variant="filled"
                    severity="warning"
                  >
                    Coach X invited you to be part of this experience. Do you want accepted?
                  </Alert>
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                  <Tasks
                    tasks={clientTasks.data ? clientTasks.data.dailyTasks : []}
                    taskPeriod={taskPeriod}
                    taskPeriodHandler={taskPeriodHandler}
                    taskPeriodRefreshHandler={taskPeriodRefreshHandler}
                    updateTaskHandler={updateTaskHandler}
                  />
                </Grid>
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
              </Grid>
            </>
          )}
      </Container>
    </Page>
  );
};

Dashboard.propTypes = {
  customerIdentifier: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    customerIdentifier: state.auth.userInfo.identifier !== null
      ? state.auth.userInfo.identifier : null
  };
};

export default connect(mapStateToProps, null)(Dashboard);
