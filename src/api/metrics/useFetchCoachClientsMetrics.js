import { useQuery } from 'react-query';
import { getCoachClientsMetrics } from '../axios';
import { logError } from '../../logging';

// eslint-disable-next-line import/prefer-default-export
export const useFetchCoachClientsMetrics = (coachIdentifier) => {
  const {
    isLoading,
    isError,
    isFetching,
    data
  } = useQuery(['getCoachClientsMetrics', coachIdentifier],
    () => getCoachClientsMetrics(coachIdentifier), {
      onError: async (err) => {
        logError('useFetchCoachClientsMetrics',
          'useQuery getCoachClientsMetrics',
          'Error:', err);
      }
    });

  return {
    isLoading,
    isFetching,
    isError,
    data
  };
};
