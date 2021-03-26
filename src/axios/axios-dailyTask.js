import moment from 'moment';
import axios from './axios-flame-coach';

export const addDailyTask = async (dailyTask, clientIdentifier, coachIdentifier) => {
  const data = JSON.stringify({
    taskName: dailyTask.name,
    taskDescription: dailyTask.description,
    date: dailyTask.date,
    toDate: null
  });

  const config = {
    method: 'post',
    url: '/dailyTask/create/task',
    headers: {
      clientIdentifier,
      coachIdentifier,
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const addMultipleDailyTasks = async (dailyTask, clientIdentifier, coachIdentifier) => {
  const data = JSON.stringify({
    taskName: dailyTask.name,
    taskDescription: dailyTask.description,
    date: dailyTask.date,
    toDate: dailyTask.toDate
  });

  const config = {
    method: 'post',
    url: '/dailyTask/create/task',
    headers: {
      clientIdentifier,
      coachIdentifier,
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const getDailyTasksByClientAndDay = async (clientIdentifier, date) => {
  const data = JSON.stringify({
    filters: [
      { type: 'IDENTIFIER', values: [clientIdentifier] },
      { type: 'BETWEEN_DATES', values: [date.format(moment.HTML5_FMT.DATE), date.format(moment.HTML5_FMT.DATE)] }]
  });

  const config = {
    method: 'post',
    url: '/dailyTask/get/tasks/filter',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const updateDailyTaskByUUID = async (taskUUID, dailyTask) => {
  const data = JSON.stringify({
    taskName: dailyTask.name,
    taskDescription: dailyTask.description,
    date: dailyTask.date,
    ticked: dailyTask.ticked,
    toDate: dailyTask.toDate
  });

  const config = {
    method: 'post',
    url: '/dailyTask/update/task',
    headers: {
      taskUUID,
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const deleteDailyTasksByUUID = async (taskUUID) => {
  const config = {
    method: 'delete',
    url: '/dailyTask/delete/task',
    headers: {
      taskUUID
    }
  };

  const response = await axios(config);

  return response.data;
};
