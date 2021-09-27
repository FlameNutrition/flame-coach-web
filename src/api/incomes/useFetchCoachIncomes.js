import { useQuery } from 'react-query';
import { logError } from '../../logging';
import { getIncomes } from '../axios';

export const useFetchCoachIncomesByDay = (coachIdentifier, from, to) => {
  const {
    isLoading,
    isError,
    isFetching,
    data
  } = useQuery(['getCoachIncomes', coachIdentifier, 'DAY'],
    () => getIncomes(coachIdentifier, from, to, 'DAY'), {
      onError: async (err) => {
        logError('useFetchCoachIncomesByDay',
          'useQuery getCoachIncomes',
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

export const useFetchCoachIncomesByMonth = (coachIdentifier, from, to, options = {}) => {
  return useQuery(
    ['getCoachClientsMetrics', coachIdentifier, from, to, 'MONTH'],
    () => getIncomes(coachIdentifier, from, to, 'MONTH'),
    options);
};

export const useFetchCoachIncomesByYear = (coachIdentifier, from, to) => {
  const {
    isLoading,
    isError,
    isFetching,
    data
  } = useQuery(['getCoachClientsMetrics', coachIdentifier, 'YEAR'],
    () => getIncomes(coachIdentifier, from, to, 'YEAR'), {
      onError: async (err) => {
        logError('useFetchCoachIncomesByYear',
          'useQuery getCoachIncomes',
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

