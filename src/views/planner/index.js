import React, { useEffect, useState } from 'react';
import {
  Box,
  Card, CardContent, Container, Grid, makeStyles
} from '@material-ui/core';
import logger from 'loglevel';
import moment from 'moment';
import update from 'immutability-helper';
import Page from '../../components/Page';
import Calendar from '../../components/Calendar/Calendar';
import TaskPreview from './TaskPreview';
import TaskTool from './TaskTool';
import SearchClient from '../../components/SearchClient';
import { getClients, getDailyTasksByClientAndDay } from '../../axios';
import ModalWarning from '../../components/ModalWarning';

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

const Planner = () => {
  const classes = useStyles();

  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', message: '' });

  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    console.log('Call effect');

    getClients(1)
      .then((response) => {
        setClients(response);
      }).catch(() => {
        setClients([]);
      });
  }, []);

  useEffect(() => {
    if (selectedClient !== null) {
      getDailyTasksByClientAndDay(selectedClient.clientId, selectedDate)
        .then((response) => {
          setTasks(response);
        }).catch(() => {
          setTasks([]);
        });
    }
  }, [selectedClient, selectedDate]);

  const refreshTasksHandler = (task) => {
    setTasks(update(tasks, { $push: [task] }));
  };

  const updateTaskHandler = (task) => {
    logger.info('Following task selected: ', task);
    setSelectedTask(task);
  };

  const searchClientSelectHandler = (client) => {
    logger.info('Following client selected: ', client);
    setSelectedClient(client);
  };

  const selectDateHandler = (value) => {
    logger.info('Period from %s to %s', moment(value[0]), moment(value[1]));
    setSelectedDate(value[0]);
  };

  const deleteTaskHandler = (task) => {
    logger.info('Delete the following task: ', task);
    setModalMessage(
      { title: 'Update task', message: 'We will update your task, please wait!' }
    );
    setModalOpen(true);
  };

  return (
    <Page
      className={classes.root}
      title="Planner"
    >
      <Container maxWidth={false}>
        <Box className={classes.searchClientCard}>
          <Card>
            <CardContent>
              <SearchClient clients={clients} searchSelectedHandler={searchClientSelectHandler} />
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
              updateTaskHandler={updateTaskHandler}
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
          <TaskTool task={selectedTask} refreshTasksHandler={refreshTasksHandler} />
        </Box>
        <ModalWarning
          open={modalOpen}
          title={modalMessage.title}
          message={modalMessage.message}
          onCloseHandler={() => {
            setModalOpen(false);
          }}
        />
      </Container>
    </Page>
  );
};

export default Planner;
