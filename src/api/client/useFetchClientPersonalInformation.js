import { useQuery } from 'react-query';
import { getClientPersonalData } from '../axios';
import { logError } from '../../logging';

// eslint-disable-next-line import/prefer-default-export
export const useFetchClientPersonalInformation = (clientIdentifier) => {
  const {
    isLoading,
    isError,
    data
  } = useQuery(['getClientPersonalData', clientIdentifier],
    () => getClientPersonalData(clientIdentifier), {
      onError: async (err) => {
        logError('Client',
          'useQuery getClientPersonalData',
          'Error:', err);
      }
    });

  return {
    isLoading,
    isError,
    data
  };
};
