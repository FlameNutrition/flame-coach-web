import mockAxios from 'axios';
import {
  addWeightClient,
  deleteWeightClient,
  getWeightClient,
  updateWeightClient
} from '../axios-measures-weight';
import moment from 'moment';

describe('axios-measures-weight tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get weight client', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getWeightClient('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios)
      .toBeCalledWith({
        method: 'get',
        url: '/client/measures/weight/get?clientIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f',
        headers: {}
      });
    expect(result)
      .toEqual({ response: 'data' });
  });

  it('add weight client', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const date = moment.utc('2021-04-04');
    const result = await addWeightClient({
      clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
      weight: 50.6,
      utcDate: date.utc()
    });

    expect(mockAxios)
      .toBeCalledWith({
        method: 'post',
        url: '/client/measures/weight/add?clientIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          value: 50.6,
          date: '2021-04-04'
        })
      });
    expect(result)
      .toEqual({ response: 'data' });
  });

  it('edit weight client', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const date = moment.utc('2021-04-04');
    const result = await updateWeightClient('a65ad74f-4f9f-4b00-98ee-756e454da73f', 100, 50.6, date
      .utc());

    expect(mockAxios)
      .toBeCalledWith({
        method: 'post',
        url: '/client/measures/weight/edit?clientIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f&identifier=100',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          value: 50.6,
          date: '2021-04-04'
        })
      });
    expect(result)
      .toEqual({ response: 'data' });
  });

  it('delete weight client', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await deleteWeightClient({
      clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
      identifier: 200
    });

    expect(mockAxios)
      .toBeCalledWith({
        method: 'delete',
        url: '/client/measures/weight/delete?clientIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f&identifier=200',
        headers: {}
      });
    expect(result)
      .toEqual({ response: 'data' });
  });
});
