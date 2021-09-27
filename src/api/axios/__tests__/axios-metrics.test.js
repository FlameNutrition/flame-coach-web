import mockAxios from 'axios';
import { getCoachClientsMetrics } from '../axios-metrics';

describe('axios-metrics tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get coach clients metrics successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getCoachClientsMetrics('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios)
      .toBeCalledWith({
        method: 'get',
        url: `/metrics/clients?coachIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f`,
      });
    expect(result)
      .toEqual({ response: 'data' });
  });
});
