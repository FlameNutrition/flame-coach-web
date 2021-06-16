import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Step,
  StepLabel,
  Stepper
} from '@material-ui/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import moment from 'moment';
import update from 'immutability-helper';
import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBackIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Page from '../../../components/Page';
import InfoMessage from '../../../components/Notification/InfoMessage/InfoMessage';
import ErrorMessage from '../../../components/Notification/ErrorMessage/ErrorMessage';
import TasksProgress from './TasksProgress';
import Tasks from './Tasks';
import MyCoach from '../../../components/MyCoach';
import { logDebug, logError } from '../../../logging';
import {
  enrollmentProcessFinish,
  enrollmentProcessStatus,
  getDailyTasksByClientAndDay,
  updateDailyTaskByUUID
} from '../../../api/axios';
import Warning from '../../../components/Warning';
import Notification from '../../../components/Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  coachConfirmation: {
    display: 'flex',
    flexFlow: 'row-reverse',
    paddingRight: '20px'
  },
  coachConfirmationNextBtn: {
    margin: '3px'
  },
  coachConfirmationBackBtn: {
    margin: '3px'
  },
  coachConfirmationWarning: {
    fontSize: 'small'
  },
  notification: {
    marginTop: '0px !important'
  }
}));

const Dashboard = ({ customerIdentifier }) => {
  const queryClient = useQueryClient();

  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [enrollment, setEnrollment] = useState({});
  const [activeCoachStep, setActiveCoachStep] = React.useState(0);
  const steps = ['Waiting for a coach invitation', 'Do you want be part of this experience?', 'Confirmation'];

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

  const progressPercentage = (data) => {
    if (!data || !data.dailyTasks) {
      return 0.0;
    }
    const listOfDailyTasks = data.dailyTasks;
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

  const clientTasks = useQuery(['getDailyTasksByClientAndDay', customerIdentifier, startDate, endDate],
    () => getDailyTasksByClientAndDay(customerIdentifier, startDate, endDate), {
      onError: async (err) => {
        logError('DashboardClient',
          'useQuery getDailyTasksByClientAndDay',
          'Error:', err);
      },
      onSettled: (data) => {
        setTaskProgress(progressPercentage(data));
      }
    });

  const enrollmentStatus = useQuery(['getEnrollmentStatus', customerIdentifier],
    () => enrollmentProcessStatus(customerIdentifier), {
      onError: async (err) => {
        logError('DashboardClient',
          'useQuery getEnrollmentStatus',
          'Error:', err);
      },
      onSuccess: (data) => {
        const coach = data.coach ? {
          name: `${data.coach.firstName} ${data.coach.lastName}`
        } : null;

        setEnrollment({
          coach,
          status: data.status
        });

        if (data.status === 'ACCEPTED') {
          setActiveCoachStep(3);
        } else if (data.status === 'PENDING') {
          setActiveCoachStep(1);
        }
      }
    });

  const enrollmentFinish = useMutation(
    ({
      // eslint-disable-next-line no-shadow
      customerIdentifier,
      flag
    }) => enrollmentProcessFinish(customerIdentifier, flag),
    {
      onError: async (error) => {
        logError('DashboardClient',
          'useMutation enrollmentProcessBreak',
          'Error:', error.response);

        logError('DashboardClient', 'useMutation enrollmentProcessBreak', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
      },
      // eslint-disable-next-line no-unused-vars
      onSuccess: async (data, variables) => {
        if (data.status === 'AVAILABLE') {
          setEnrollment(update(enrollment, {
            coach: { $set: null },
            status: { $set: 'AVAILABLE' }
          }));
          setActiveCoachStep((prevState) => prevState - 1);
          notificationHandler();
        } else if (data.status === 'ACCEPTED') {
          setEnrollment(update(enrollment, {
            status: { $set: 'ACCEPTED' }
          }));
          setActiveCoachStep((prevState) => prevState + 1);
          notificationHandler();
        } else {
          const errorCode = ErrorMessage.CODE_9999;
          updateNotificationHandler(true, errorCode.msg, errorCode.level);
        }
      }
    }
  );

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
        logError('DashboardClient', 'updateDailyTaskMutation', 'Error Details:', error.response.data.detail);
        const errorCode = ErrorMessage.fromCode(error.response.data.code);
        updateNotificationHandler(true, errorCode.msg, errorCode.level);
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

        setTaskProgress(progressPercentage(data));
        notificationHandler();
      }
    }
  );

  const progressLabel = () => {
    switch (taskPeriod) {
      case 'today':
        return 'TODAY';
      case 'thisWeek':
        return 'THIS WEEK';
      case 'lastWeek':
        return 'LAST WEEK';
      case 'nextWeek':
        return 'NEXT WEEK';
      default:
        return 'TODAY';
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
    let initDate;
    let
      finalDate;

    switch (event.target.value) {
      case 'today': {
        const today = now.toDate();
        initDate = today;
        finalDate = today;
        break;
      }
      case 'thisWeek': {
        initDate = now.startOf('week')
          .toDate();
        finalDate = now.endOf('week')
          .toDate();
        break;
      }
      case 'lastWeek': {
        const firstDayOfWeek = now.startOf('week');
        initDate = moment(firstDayOfWeek)
          .subtract(7, 'days')
          .toDate();
        finalDate = moment(firstDayOfWeek)
          .subtract(1, 'days')
          .toDate();
        break;
      }
      case 'nextWeek': {
        const firstDayOfWeek = now.startOf('week');
        initDate = moment(firstDayOfWeek)
          .add(7, 'days')
          .toDate();
        finalDate = moment(firstDayOfWeek)
          .add(13, 'days')
          .toDate();
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

  const generalProblem = <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />;

  const dashboard = (
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
          <MyCoach coachName={enrollment.coach ? enrollment.coach.name : null} />
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
          <Card>
            <CardContent>
              <Stepper activeStep={activeCoachStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <div className={classes.coachConfirmation}>
                {activeCoachStep === steps.length ? (
                  <IconButton
                    aria-label="Reset"
                    disabled
                    onClick={() => setActiveCoachStep(0)}
                  />
                ) : (
                  <div>
                    <IconButton
                      color="primary"
                      aria-label="Back"
                      className={classes.coachConfirmationBackBtn}
                      disabled={activeCoachStep === 0}
                      onClick={() => {
                        if (activeCoachStep === 1) {
                          enrollmentFinish.mutate({
                            customerIdentifier,
                            flag: false
                          });
                        } else {
                          setActiveCoachStep((prevState) => prevState - 1);
                        }
                      }}
                    >
                      <NavigateBackIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      aria-label={activeCoachStep === steps.length - 1 ? 'Finish' : 'Next'}
                      className={classes.coachConfirmationNextBtn}
                      disabled={enrollment.status === 'AVAILABLE'}
                      onClick={() => {
                        if (activeCoachStep === 2) {
                          enrollmentFinish.mutate({
                            customerIdentifier,
                            flag: true
                          });
                        } else {
                          setActiveCoachStep((prevState) => prevState + 1);
                        }
                      }}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </div>
                )}
              </div>
              {activeCoachStep === steps.length - 1 ? (
                <div className={classes.coachConfirmation}>
                  <Alert severity={ErrorMessage.CODE_0004.level.toLowerCase()}>
                    {' '}
                    {ErrorMessage.CODE_0004.msg}
                  </Alert>
                </div>
              ) : null}

              {activeCoachStep === steps.length ? (
                <div className={classes.coachConfirmation}>
                  <Alert severity={InfoMessage.CODE_0001.level.toLowerCase()}>
                    {' '}
                    {InfoMessage.CODE_0001.msg}
                  </Alert>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        {notification.enable
          ? (
            <Grid
              item
              xs={12}
            >
              <Notification
                className={classes.notification}
                collapse
                open={notification.enable}
                openHandler={notificationHandler}
                level={notification.level}
                message={notification.message}
              />
            </Grid>
          )
          : null}
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
      </Grid>
    </>
  );

  let container;

  if (!clientTasks.isLoading && !enrollmentStatus.isLoading) {
    container = (clientTasks.isError || enrollmentStatus.isError) ? generalProblem : dashboard;
  } else {
    container = null;
  }

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        {container}
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

export { Dashboard, mapStateToProps };
