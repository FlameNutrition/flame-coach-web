import {
  enrollmentProcessBreak,
  enrollmentProcessFinish,
  enrollmentProcessInit,
  enrollmentProcessStatus
} from '../axios-enrollment-process';

import mockAxios from 'axios';

describe('axios-enrollment-process tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('init enrollment process successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await enrollmentProcessInit('a65ad74f-4f9f-4b00-98ee-756e454da73f', 'f2c9ada9-05f1-4225-a724-6858d2a80c68');

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/client/enrollment/init',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        client: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
        coach: 'f2c9ada9-05f1-4225-a724-6858d2a80c68',
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('finish enrollment process successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await enrollmentProcessFinish('a65ad74f-4f9f-4b00-98ee-756e454da73f', true);

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/client/enrollment/finish',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        client: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
        accept: true,
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('break enrollment process successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await enrollmentProcessBreak('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/client/enrollment/break',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        client: 'a65ad74f-4f9f-4b00-98ee-756e454da73f'
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('status enrollment process successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await enrollmentProcessStatus('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/client/enrollment/status',
      headers: {
        clientUUID: 'a65ad74f-4f9f-4b00-98ee-756e454da73f'
      }
    });
    expect(result).toEqual({ response: 'data' });
  });
});
