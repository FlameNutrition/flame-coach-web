import { useQuery } from 'react-query';
import { getWeightClient } from '../axios';
import { logError } from '../../logging';
import { orderPerDate } from '../../components/Charts/utils/chartUtil';

// eslint-disable-next-line import/prefer-default-export
export const useFetchWeightClient = (clientIdentifier) => {
  const {
    isFetching,
    isError,
    data
  } = useQuery(['getWeightClient', clientIdentifier],
    () => getWeightClient(clientIdentifier), {
      onError: async (err) => {
        logError('Measures',
          'useQuery getWeightClient',
          'Error:', err);
      },
      select: (data) => {
        if (data === undefined || data.weights === undefined) {
          return [];
        }

        return data.weights.sort(orderPerDate);
      }
    });

  return {
    isFetching,
    isError,
    data
  };
};
