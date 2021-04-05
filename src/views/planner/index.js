import React, { useEffect, useState } from 'react';
import {
  Box,
  Card, CardContent, Container, Grid, makeStyles
} from '@material-ui/core';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Page from '../../components/Page';
import Calendar from '../../components/Calendar/Calendar';
import TaskPreview from './TaskPreview';
import TaskTool from './TaskTool';
import SearchClient from '../../components/SearchClient';
import {
  addDailyTask,
  addMultipleDailyTasks,
  deleteDailyTasksByUUID,
  getClientsCoach,
  getDailyTasksByClientAndDay,
  updateDailyTaskByUUID
} from '../../axios';
import Warning from '../../components/Warning';
import { logDebug, logError } from '../../logging';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  searchClientCard: {
    marginBottom: theme.spacing(3)
  },
  actionTaskCard: {
    marginTop: theme.spacing(3)
  }
}));

const Planner = ({ customerIdentifier }) => {
  const classes = useStyles();

  const queryClient = useQueryClient();

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const clients = useQuery(['getClientsCoach', customerIdentifier],
    () => getClientsCoach(customerIdentifier), {
      onError: async (err) => {
        logError('Planner',
          'useQuery getClientsCoach',
          'Error:', err);
      },
      refetchOnMount: 'always'
    });

  const clientTasks = useQuery(['getDailyTasksByClientAndDay', selectedClient, selectedDate],
    () => getDailyTasksByClientAndDay(selectedClient.identifier, selectedDate, selectedDate), {
      onError: async (err) => {
        logError('Planner',
          'useQuery getDailyTasksByClientAndDay',
          'Error:', err);
      },
      enabled: false
    });

  useEffect(() => {
    if (selectedClient !== null && selectedDate !== null) {
      clientTasks.refetch();
    }
  }, [selectedClient, selectedDate]);

  const searchClientSelectHandler = (client) => {
    logDebug('Planner',
      'searchClientSelectHandler',
      'Client Selected:', client);
    setSelectedClient(client);
  };

  const selectDateHandler = (value) => {
    logDebug('Planner',
      'selectDateHandler',
      'Period Selected:', value[0], value[1]);
    setSelectedDate(value[0]);
  };

  const selectUpdateTaskHandler = (task) => {
    logDebug('Planner',
      'selectUpdateTaskHandler',
      'Task Selected', task);
    setSelectedTask(task);
  };

  const notificationHandler = () => {
    setNotification(update(notification,
      {
        enable: { $set: false }
      }));
  };

  const addMultiplesDailyTasksMutation = useMutation(
    ({
      task,
      clientIdentifier,
      // eslint-disable-next-line no-shadow
      coachIdentifier
    }) => addMultipleDailyTasks(task, clientIdentifier, coachIdentifier),
    {
      onError: async (error) => {
        logError('Planner',
          'addMultiplesDailyTasksMutation',
          'Error:', error);

        const message = error.response.data.detail;
        const level = error.response.data.status === 500 ? 'ERROR' : 'WARNING';

        updateNotificationHandler(true, message, level);
      }
    }
  );

  const addDailyTaskMutation = useMutation(
    ({
      task,
      clientIdentifier,
      // eslint-disable-next-line no-shadow
      coachIdentifier
    }) => addDailyTask(task, clientIdentifier, coachIdentifier),
    {
      onError: async (error) => {
        logError('Planner',
          'addDailyTaskMutation',
          'Error:', error);

        const message = error.response.data.detail;
        const level = error.response.data.status === 500 ? 'ERROR' : 'WARNING';

        updateNotificationHandler(true, message, level);
      },
      onSuccess: async (data) => {
        await queryClient.cancelQueries(['getDailyTasksByClientAndDay', selectedClient, selectedDate]);

        logDebug('Planner',
          'addDailyTaskMutation',
          'Response:', data);

        queryClient.setQueryData(['getDailyTasksByClientAndDay', selectedClient, selectedDate], (oldData) => {
          logDebug('Planner',
            'addDailyTaskMutation',
            'Old Data:', oldData);
          return update(oldData, { dailyTasks: { $push: [data.dailyTasks[0]] } });
        });

        updateNotificationHandler(true, 'Task added with success!', 'SUCCESS');
      }
    }
  );

  const updateDailyTaskMutation = useMutation(
    ({
      taskIdentifier,
      newTask
    }) => updateDailyTaskByUUID(taskIdentifier, newTask),
    {
      onError: async (error) => {
        logError('Planner',
          'updateDailyTaskMutation',
          'Error:', error);

        const message = error.response.data.detail;
        const level = error.response.data.status === 500 ? 'ERROR' : 'WARNING';

        updateNotificationHandler(true, message, level);
      },
      onSuccess: async (data, variables) => {
        await queryClient.cancelQueries(['getDailyTasksByClientAndDay', selectedClient, selectedDate]);

        logDebug('Planner',
          'updateDailyTaskMutation',
          'Response:', data);

        queryClient.setQueryData(['getDailyTasksByClientAndDay', selectedClient, selectedDate], (oldData) => {
          logDebug('Planner',
            'updateDailyTaskMutation',
            'Old Data:', oldData);
          const index = oldData.dailyTasks.findIndex(
            (dailyTask) => dailyTask !== undefined
              && dailyTask.identifier === variables.taskIdentifier
          );

          // FIXME: The undefined values should be deleted
          const newData = update(oldData, {
            dailyTasks: {
              [index]: { $set: data.dailyTasks[0] }
            }
          });

          logDebug('Planner',
            'updateDailyTaskMutation',
            'New Data:', newData);

          return newData;
        });

        updateNotificationHandler(true, 'Task updated with success!', 'SUCCESS');
        setSelectedTask(null);
      }
    }
  );

  const deleteDailyTaskMutation = useMutation(
    ({ taskIdentifier }) => deleteDailyTasksByUUID(taskIdentifier),
    {
      onError: async (error) => {
        logError('Planner',
          'deleteDailyTaskMutation',
          'Error:', error);

        const message = error.response.data.detail;
        const level = error.response.data.status === 500 ? 'ERROR' : 'WARNING';

        updateNotificationHandler(true, message, level);
      },
      onSuccess: async (data, variables) => {
        await queryClient.cancelQueries(['getDailyTasksByClientAndDay', selectedClient, selectedDate]);

        logDebug('Planner',
          'deleteDailyTaskMutation',
          'Response:', data);

        queryClient.setQueryData(['getDailyTasksByClientAndDay', selectedClient, selectedDate], (oldData) => {
          logDebug('Planner',
            'deleteDailyTaskMutation',
            'Old Data:', oldData);
          const index = oldData.dailyTasks.findIndex(
            (dailyTask) => dailyTask !== undefined
              && dailyTask.identifier === variables.taskIdentifier
          );

          // FIXME: The undefined values should be deleted
          const newData = update(oldData, { dailyTasks: { $unset: [index] } });

          logDebug('Planner',
            'deleteDailyTaskMutation',
            'New Data:', newData);

          return newData;
        });

        updateNotificationHandler(true, 'Task deleted with success!', 'SUCCESS');
      }
    }
  );

  const addMultipleTasksHandler = (task) => {
    if (selectedClient === null) {
      updateNotificationHandler(true,
        'Ops! You need select a client first. Please choose a client in the top of the application',
        'WARNING');
    }

    if (selectedClient !== null && selectedDate !== null) {
      logDebug('Planner',
        'addMultipleTasksHandler',
        'Add multiple tasks action. Task: ', task);
      addMultiplesDailyTasksMutation.mutate(
        {
          task,
          clientIdentifier: selectedClient.identifier,
          coachIdentifier: customerIdentifier
        }
      );
    }
  };

  const addTasksHandler = (task) => {
    if (selectedClient === null) {
      updateNotificationHandler(true,
        'Ops! You need select a client first. Please choose a client in the top of the application',
        'WARNING');
    }

    if (selectedClient !== null && selectedDate !== null) {
      addDailyTaskMutation.mutate(
        {
          task,
          clientIdentifier: selectedClient.identifier,
          coachIdentifier: customerIdentifier
        }
      );
    }
  };

  const updateTasksHandler = (newTask) => {
    if (selectedTask === null) {
      updateNotificationHandler(true,
        'Ops! You need select a task first. Please choose the task you want to update',
        'WARNING');
    }

    if (selectedTask !== null && selectedClient !== null && selectedDate !== null) {
      newTask = update(newTask, { ticked: { $set: selectedTask.ticked } });

      updateDailyTaskMutation.mutate({
        taskIdentifier: selectedTask.identifier,
        newTask
      });
    }
  };

  const deleteTaskHandler = (task) => {
    if (task !== null) {
      deleteDailyTaskMutation.mutate({ taskIdentifier: task.identifier });
    }
  };

  return (
    <Page
      className={classes.root}
      title="Planner"
    >
      <Container maxWidth={false}>
        {!clients.isLoading && clients.isError
          ? <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />
          : null}
        {!clients.isLoading && clients.data ? (
          <>
            <Box className={classes.searchClientCard}>
              <Card>
                <CardContent>
                  <SearchClient
                    clients={clients.data.clientsCoach}
                    searchSelectedHandler={searchClientSelectHandler}
                  />
                </CardContent>
              </Card>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >
                <TaskPreview
                  tasks={clientTasks.data ? clientTasks.data.dailyTasks : []}
                  date={selectedDate}
                  selectUpdateTaskHandler={selectUpdateTaskHandler}
                  deleteTaskHandler={deleteTaskHandler}
                />
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <Calendar daily onChangeCalendar={selectDateHandler} />
              </Grid>
            </Grid>
            <Box className={classes.actionTaskCard}>
              <TaskTool
                task={selectedTask}
                notification={notification}
                notificationCollapseHandler={notificationHandler}
                updateNotificationHandler={updateNotificationHandler}
                addTasksHandler={addTasksHandler}
                addMultipleTasksHandler={addMultipleTasksHandler}
                updateTaskHandler={updateTasksHandler}
                selectUpdateTaskHandler={selectUpdateTaskHandler}
              />
            </Box>
          </>
        ) : null}
      </Container>
    </Page>
  );
};

Planner.propTypes = {
  customerIdentifier: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    customerIdentifier: state.auth.userInfo.identifier !== null
      ? state.auth.userInfo.identifier : null
  };
};

export default connect(mapStateToProps, null)(Planner);
