import mockAxios from 'axios';
import { getIncomes } from '../axios-incomes';

describe('axios-incomes tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get accepted coach incomes successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getIncomes('a65ad74f-4f9f-4b00-98ee-756e454da73f',
      '2020-01-01',
      '2020-10-01',
      'DAY');

    expect(mockAxios)
      .toBeCalledWith({
        method: 'get',
        url: `/income/coach/getAcceptedIncomes?coachIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f&from=2020-01-01&to=2020-10-01&aggregateType=DAY`,
      });
    expect(result)
      .toEqual({ response: 'data' });
  });
});
