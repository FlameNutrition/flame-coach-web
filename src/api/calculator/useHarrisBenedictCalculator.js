import { useQuery } from 'react-query';
import { getHarrisBenedictCalculator } from '../axios';
import { logError } from '../../logging';

export const useHarrisBenedictCalculator = ({ weight, height, gender, age, pal = null, unit = 'kg/cm' }, options) => {
  return useQuery(
    ['getHarrisBenedictCalculator', { weight, height, gender, age, unit, pal }],
    () => getHarrisBenedictCalculator(weight, height, gender, age, unit, pal),
    {
      ...options,
      onError: async (err) => {
        logError('Client',
          'useQuery getHarrisBenedictCalculator',
          'Error:', err);
      }
    });
};
