import {
  getHarrisBenedictCalculator
} from '../axios-calories-calculator';

import mockAxios from 'axios';

describe('axios-calories-calculator tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get harris benedict calculator result using pal', async () => {
    mockAxios.mockResolvedValueOnce({ data: {} });

    const result = await getHarrisBenedictCalculator(70.5, 1.57, 'Male', 30, 'kg/cm', 1);

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/calculator/harrisBenedict?weight=70.5&height=1.57&sex=Male&age=30&unit=kg/cm&pal=1',
    });
    expect(result).toEqual({});
  });

  it('get harris benedict calculator result without using pal', async () => {
    mockAxios.mockResolvedValueOnce({ data: {} });

    const result = await getHarrisBenedictCalculator(70.5, 1.57, 'Male', 30, 'kg/cm', null);

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/calculator/harrisBenedict?weight=70.5&height=1.57&sex=Male&age=30&unit=kg/cm',
    });
    expect(result).toEqual({});
  });
});
