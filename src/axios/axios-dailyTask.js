import axios from './axios-flame-coach';

export const addDailyTask = async (dailyTask, clientToken, coachToken) => {
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
      clientToken,
      coachToken,
      'Content-Type': 'application/json'
    },
    data
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
          identifier: '7ebc929-3cfc-4e71-bd1d-7a4b1759abf9',
          taskName: 'Drink 3L of water',
          taskDescription: 'A simple description',
          date: '2020-12-05',
          ticked: false
        }, {
          identifier: '7ebc929-3cfc-4e71-bd1d-7a4b1759abf9',
          taskName: 'Task 2',
          taskDescription: 'A simple description',
          date: '2020-12-05',
          ticked: false
        }, {
          identifier: '7ebc929-3cfc-4e71-bd1d-7a4b1759abf9',
          taskName: 'Task 3',
          taskDescription: 'A simple description',
          date: '2020-12-05',
          ticked: false
        }
        ]
      );
    } else {
      console.log('promise fail');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Problem!');
    }
  });
};

export const deleteDailyTasksByUUID = async (taskUUID) => {
  return new Promise((resolve, reject) => {
    if (taskUUID !== null) {
      console.log('promise success');
      resolve(true);
    } else {
      console.log('promise fail');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Problem!');
    }
  });
};
