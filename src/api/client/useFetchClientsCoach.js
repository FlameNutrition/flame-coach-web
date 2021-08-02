import { useQuery } from 'react-query';
import { getClientsCoach } from '../axios';
import { logError } from '../../logging';

// eslint-disable-next-line import/prefer-default-export
export const useFetchClientsCoach = (coachIdentifier) => {
  const {
    isLoading,
    isError,
    isFetching,
    data
  } = useQuery(['getClientsCoach', coachIdentifier],
    () => getClientsCoach(coachIdentifier), {
      onError: async (err) => {
        logError('useFetchClientsCoach',
          'useQuery getClientPersonalData',
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
