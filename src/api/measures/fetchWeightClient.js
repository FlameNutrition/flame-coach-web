import { useQuery } from 'react-query';
import { getWeightClient } from '../axios';
import { logError } from '../../logging';
import { orderPerDate } from '../../components/Charts/utils/chartUtil';

const fetchWeightClient = (clientIdentifier) => {
  const {
    isLoading,
    isError,
    data
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

  return { isLoading, isError, data };
};

export {
  // eslint-disable-next-line import/prefer-default-export
  fetchWeightClient
};
