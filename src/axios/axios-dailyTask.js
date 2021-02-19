import axios from './axios-flame-coach';

export const addDailyTask = async (dailyTask) => {
  const config = {
    method: 'post',
    url: '',
    headers: {
      'Content-Type': 'application/json'
    },
    data: dailyTask
  };

  return axios(config);
};

export const getDailyTasksByClientAndDay = async (clientId, date) => {
  // return axios(`/api/dailyTask/get/task/client/${clientId}`);

  return new Promise((resolve, reject) => {
    if (clientId === 100 && date !== null) {
      console.log('promise success');
      resolve(
        [{
          taskId: 1,
          taskTitle: 'Drink 3L of water',
          taskDescription: 'A simple description',
          taskTicked: false
        },
        {
          taskId: 2,
          taskTitle: 'Measure',
          taskDescription: 'A simple description',
          taskTicked: false
        },
        {
          taskId: 3,
          taskTitle: 'Measure',
          taskDescription: 'A simple description',
          taskTicked: false
        },
        {
          taskId: 4,
          taskTitle: 'Measure',
          taskDescription: 'A simple description',
          taskTicked: false
        },
        {
          taskId: 5,
          taskTitle: 'Measure',
          taskDescription: 'A simple description',
          taskTicked: false
        }]
      );
    } else {
      console.log('promise fail');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Problem!');
    }
  });
};
