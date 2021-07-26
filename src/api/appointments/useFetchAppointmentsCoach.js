import { useQuery } from 'react-query';
import { logError } from '../../logging';
import { getAllAppointmentsCoach } from '../axios/axios-appointments';

// eslint-disable-next-line import/prefer-default-export
export const useFetchAppointmentsCoach = (coachIdentifier, initialData) => {
  const {
    isLoading,
    isError,
    isFetching,
    data
  } = useQuery(['getAppointmentsCoach', coachIdentifier],
    () => getAllAppointmentsCoach(coachIdentifier), {
      initialData: () => {
        return initialData
      },
      onError: async (err) => {
        logError('Measures',
          'useQuery getWeightClient',
          'Error:', err);
      }
    });

  return {
    isLoading,
    isError,
    isFetching,
    data
  };
};
