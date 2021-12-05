import {
  useHarrisBenedictCalculator
} from '../useHarrisBenedictCalculator';
import { getHarrisBenedictCalculator } from '../../axios';
import { renderHook } from "../../../testing/test-utils";

jest.mock('../../axios');

describe('useHarrisBenedictCalculator tests', () => {

  it('call useHarrisBenedictCalculator', async () => {

    getHarrisBenedictCalculator.mockReturnValueOnce({});

    const { result, waitFor } = renderHook(() => useHarrisBenedictCalculator(
      {
        weight: 80.7,
        height: 1.65,
        gender: 'Male',
        age: 30,
        pal: 2,
        unit: 'kg/cm'
      }
    ));

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({});
    expect(getHarrisBenedictCalculator).toBeCalledWith(80.7, 1.65, 'Male', 30, 'kg/cm', 2);
  });

  it('call useHarrisBenedictCalculator using default values', async () => {

    getHarrisBenedictCalculator.mockReturnValueOnce({});

    const { result, waitFor } = renderHook(() => useHarrisBenedictCalculator(
      {
        weight: 80.7,
        height: 1.65,
        gender: 'Male',
        age: 30
      }
    ));

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({});
    expect(getHarrisBenedictCalculator).toBeCalledWith(80.7, 1.65, 'Male', 30, 'kg/cm', null);
  });
});
