import { useQuery } from 'react-query';
import { getClientNextAppointment } from '../axios';

export const useFetchNextClientAppointment = (clientIdentifier, options = {}) => {
  return useQuery(['getClientNextAppointment', clientIdentifier],
    () => getClientNextAppointment(clientIdentifier),
    options);
};
