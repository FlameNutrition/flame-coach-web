import {
  addDailyTask,
  addMultipleDailyTasks,
  deleteDailyTasksByUUID,
  getDailyTasksByClientAndDay,
  updateDailyTaskByUUID
} from '../axios-dailyTask';

import mockAxios from 'axios';
import moment from 'moment';

describe('axios-dailyTask tests', () => {
  it('add daily task successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const dailyTask = {
      name: 'Drink water',
      description: 'Drink around 1L of water',
      date: '20-04-2021'
    };

    const result = await addDailyTask(dailyTask, 'a65ad74f-4f9f-4b00-98ee-756e454da73f', 'f2c9ada9-05f1-4225-a724-6858d2a80c68');

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/dailyTask/create/task',
      headers: {
        clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
        coachIdentifier: 'f2c9ada9-05f1-4225-a724-6858d2a80c68',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        taskName: 'Drink water',
        taskDescription: 'Drink around 1L of water',
        date: '20-04-2021',
        toDate: null,
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('add multiple daily task successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const dailyTask = {
      name: 'Drink water',
      description: 'Drink around 1L of water',
      date: '20-04-2021',
      toDate: '21-04-2021',
    };

    const result = await addMultipleDailyTasks(dailyTask, 'a65ad74f-4f9f-4b00-98ee-756e454da73f', 'f2c9ada9-05f1-4225-a724-6858d2a80c68');

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/dailyTask/create/task',
      headers: {
        clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
        coachIdentifier: 'f2c9ada9-05f1-4225-a724-6858d2a80c68',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        taskName: 'Drink water',
        taskDescription: 'Drink around 1L of water',
        date: '20-04-2021',
        toDate: '21-04-2021',
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('get daily task filter by client and date successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const toDttm = moment('2021-04-03').add(1, 'days').toDate();
    const fromDttm = moment('2021-04-03').subtract(1, 'days').toDate();

    const result = await getDailyTasksByClientAndDay('a65ad74f-4f9f-4b00-98ee-756e454da73f', fromDttm, toDttm);

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/dailyTask/get/tasks/filter',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        filters: [
          { type: 'IDENTIFIER', values: ['a65ad74f-4f9f-4b00-98ee-756e454da73f'] },
          { type: 'BETWEEN_DATES', values: ['2021-04-02', '2021-04-04'] }]
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('update daily task successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const dailyTask = {
      name: 'Drink water',
      description: 'Drink around 1L of water',
      date: '20-04-2021',
      ticked: false,
      toDate: '21-04-2021',
    };

    const result = await updateDailyTaskByUUID('a65ad74f-4f9f-4b00-98ee-756e454da73f', dailyTask);

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/dailyTask/update/task',
      headers: {
        taskUUID: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        taskName: 'Drink water',
        taskDescription: 'Drink around 1L of water',
        date: '20-04-2021',
        ticked: false,
        toDate: '21-04-2021',
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('delete daily task successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await deleteDailyTasksByUUID('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'delete',
      url: '/dailyTask/delete/task',
      headers: {
        taskUUID: 'a65ad74f-4f9f-4b00-98ee-756e454da73f'
      }
    });

    expect(result).toEqual({ response: 'data' });
  });
});
