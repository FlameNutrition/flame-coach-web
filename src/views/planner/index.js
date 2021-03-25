import React, { useEffect, useState } from 'react';
import {
  Box,
  Card, CardContent, Container, Grid, makeStyles
} from '@material-ui/core';
import logger from 'loglevel';
import moment from 'moment';
import update from 'immutability-helper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Calendar from '../../components/Calendar/Calendar';
import TaskPreview from './TaskPreview';
import TaskTool from './TaskTool';
import SearchClient from '../../components/SearchClient';
import {
  addDailyTask, addMultipleDailyTasks, deleteDailyTasksByUUID, getClientsCoach,
  getDailyTasksByClientAndDay, updateDailyTaskByUUID
} from '../../axios';
import Warning from '../../components/Warning';
import Notification from '../../components/Notification';

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

const Planner = ({ coachIdentifier }) => {
  const classes = useStyles();

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment.utc());

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    enable: false,
    message: '',
    level: 'INFO'
  });

  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState(null);

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
      logger.error('%s Exception:', 'Planner -', ex);
      setGenericErrorMessage();
    }
  };

  useEffect(() => {
    if (clients === null) {
      getClientsCoach(coachIdentifier)
        .then((response) => {
          setClients(response.data.clientsCoach);
        }).catch((error) => {
          logger.error('%s Exception', 'Planner -', error);
          setLoading(false);
          setClients(null);
        });
    }
  }, []);

  useEffect(() => {
    if (selectedClient !== null && selectedDate !== null) {
      getDailyTasksByClientAndDay(selectedClient.identifier, selectedDate)
        .then((response) => {
          if (response.data.dailyTasks !== undefined) {
            setTasks(response.data.dailyTasks);
          } else {
            setGenericErrorMessage();
          }
        }).catch(() => {
          setTasks([]);
          setGenericErrorMessage();
        });
    } else {
      setTasks([]);
    }
  }, [selectedClient, selectedDate]);

  const searchClientSelectHandler = (client) => {
    logger.debug('%s Following client selected:', 'Planner -', client);
    setSelectedClient(client);
  };

  const selectDateHandler = (value) => {
    logger.debug('%s Period from %s to %s', 'Planner -', moment(value[0]), moment(value[1]));

    setSelectedDate(moment(value[0]).utc());
  };

  const selectUpdateTaskHandler = (task) => {
    logger.debug('%s Following task selected:', 'Planner -', task);
    setSelectedTask(task);
  };

  const notificationHandler = () => {
    setNotification(update(notification,
      {
        enable: { $set: false }
      }));
  };

  const addMultipleTasksHandler = (task) => {
    if (selectedClient === null) {
      setNotification(update(notification,
        {
          enable: { $set: true },
          message: { $set: 'Ops! You need select a client first. Please choose a client in the top of the application' },
          level: { $set: 'WARNING' }
        }));
    }

    if (selectedClient !== null && selectedDate !== null) {
      logger.debug('%s Add Multiple Tasks:', 'Planner -', task);

      addMultipleDailyTasks(task, selectedClient.identifier, coachIdentifier)
        .then((response) => {
          // TODO: Process the success message for multiple daily tasks
          logger.warn('%s Process success message:', 'Planner -', response.data);
        })
        .catch((error) => {
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
            setGenericErrorMessage();
          }
        });
    }
  };

  const addTasksHandler = (task) => {
    if (selectedClient === null) {
      setNotification(update(notification,
        {
          enable: { $set: true },
          message: { $set: 'Ops! You need select a client first. Please choose a client in the top of the application' },
          level: { $set: 'WARNING' }
        }));
    }

    if (selectedClient !== null && selectedDate !== null) {
      logger.debug('%s Task:', 'Planner -', task);

      addDailyTask(task, selectedClient.identifier, coachIdentifier)
        .then((response) => {
          if (response.data.dailyTasks[0] !== null) {
            setTasks(update(tasks, { $push: [response.data.dailyTasks[0]] }));
            setNotification(update(notification,
              {
                enable: { $set: true },
                message: { $set: 'Task added with success!' },
                level: { $set: 'SUCCESS' }
              }));
            setSelectedTask(null);
          }
        })
        .catch((error) => {
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
            setGenericErrorMessage();
          }
        });
    }
  };

  const updateTasksHandler = (newTask) => {
    if (selectedTask === null) {
      setNotification(update(notification,
        {
          enable: { $set: true },
          message: { $set: 'Ops! You need select a task first. Please choose the task you want to update' },
          level: { $set: 'WARNING' }
        }));
    }

    if (selectedTask !== null && selectedClient !== null && selectedDate !== null) {
      newTask = update(newTask, { ticked: { $set: selectedTask.ticked } });

      logger.debug('%s Task:', 'Planner -', newTask);

      updateDailyTaskByUUID(selectedTask.identifier, newTask)
        .then((response) => {
          if (response.data.dailyTasks[0] !== null) {
            try {
              const index = tasks.findIndex(
                (dailyTask) => dailyTask !== undefined
                  && dailyTask.identifier === selectedTask.identifier
              );

              setTasks(update(tasks, {
                [index]: { $set: response.data.dailyTasks[0] }
              }));

              setNotification(update(notification,
                {
                  enable: { $set: true },
                  message: { $set: 'Task updated with success!' },
                  level: { $set: 'SUCCESS' }
                }));

              setSelectedTask(null);
            } catch (ex) {
              logger.error('%s Exception:', 'Planner -', ex);
              setGenericErrorMessage();
            }
          }
        })
        .catch((error) => {
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
            setGenericErrorMessage();
          }
        });
    }
  };

  const deleteTaskHandler = (task) => {
    if (task !== null) {
      logger.debug('%s Task', 'Planner-', task);
      deleteDailyTasksByUUID(task.identifier)
        .then((response) => {
          if (response.data.dailyTasks[0].identifier !== null) {
            try {
              const index = tasks.findIndex(
                (dailyTask) => dailyTask !== undefined && dailyTask.identifier === task.identifier
              );

              setTasks(update(tasks, {
                $unset: [index]
              }));

              setNotification(update(notification,
                {
                  enable: { $set: true },
                  message: { $set: 'Task deleted with success!' },
                  level: { $set: 'SUCCESS' }
                }));
            } catch (ex) {
              logger.error('%s Exception:', 'Planner -', ex);
              setGenericErrorMessage();
            }
          } else {
            setGenericErrorMessage();
          }
        }).catch((error) => {
          setSpecificErrorMessage(error);
        });
    }
  };

  return (
    <Page
      className={classes.root}
      title="Planner"
    >
      <Container maxWidth={false}>
        {!loading && clients === null
          ? <Warning message={process.env.REACT_APP_MSG_SERVER_ERROR} />
          : null}
        {clients !== null ? (
          <>
            <Box className={classes.searchClientCard}>
              <Card>
                <CardContent>
                  <SearchClient
                    clients={clients}
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
                  tasks={tasks}
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
                addTasksHandler={addTasksHandler}
                addMultipleTasksHandler={addMultipleTasksHandler}
                updateTaskHandler={updateTasksHandler}
                selectUpdateTaskHandler={selectUpdateTaskHandler}
              />
            </Box>
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
        ) : null}
      </Container>
    </Page>
  );
};

Planner.propTypes = {
  coachIdentifier: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    coachIdentifier: state.auth.userInfo.identifier !== null
      ? state.auth.userInfo.identifier : null
  };
};

export default connect(mapStateToProps, null)(Planner);
