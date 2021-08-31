import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import update from 'immutability-helper';
import Page from '../../../components/Page';
import ErrorMessage from '../../../components/Core/Notification/ErrorMessage/ErrorMessage';
import TasksProgress from '../../../components/Dashboard/TaskProgress';
import Tasks from './Tasks';
import MyCoach from '../../../components/Dashboard/MyCoach';
import { logDebug, logError } from '../../../logging';
import {
  enrollmentProcessFinish,
  enrollmentProcessStatus,
  getDailyTasksByClientAndDay,
  updateDailyTaskByUUID
} from '../../../api/axios';
import Notification from '../../../components/Core/Notification';
import EnrollmentCard from './EnrollmentCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  notification: {
    marginTop: '0px !important'
  }
}));

const Dashboard = ({
  customerIdentifier
}) => {
  const queryClient = useQueryClient();

  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [enrollment, setEnrollment] = useState({});
  const [activeCoachStep, setActiveCoachStep] = React.useState(0);

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
    let finalDate;

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

  return (
    <Page
      title="Dashboard"
      isError={clientTasks.isError || enrollmentStatus.isError}
      isLoading={clientTasks.isLoading || enrollmentStatus.isLoading}
    >
      <>
        <Grid
          container
          spacing={3}
        >
          {
            /* TODO: Implement this when I have the get last appointment endpoint
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >
              <NextAppointment isLoading={false} date={moment()}/>
            </Grid>
            */
          }
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress
              isLoading={clientTasks.isFetching}
              type={progressLabel(taskPeriod)}
              progress={tasksProgress}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <MyCoach
              isLoading={enrollmentStatus.isFetching}
              coachName={enrollment.coach ? enrollment.coach.name : null}
            />
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
            <EnrollmentCard
              isLoading={enrollmentStatus.isFetching}
              activeCoachStep={activeCoachStep}
              setActiveCoachStep={setActiveCoachStep}
              customerIdentifier={customerIdentifier}
              enrollmentFinish={enrollmentFinish}
              enrollmentStatus={enrollment?.status}
            />
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
    </Page>
  );
};

Dashboard.propTypes = {
  customerIdentifier: PropTypes.string.isRequired
};

export default Dashboard;
