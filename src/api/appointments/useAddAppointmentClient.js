import { useMutation } from 'react-query';
import { addAppointment } from '../axios/axios-appointments';

// eslint-disable-next-line import/prefer-default-export
export const useAddAppointmentClient = () => {
  const {
    mutate,
    isLoading
  } = useMutation(addAppointment);

  return {
    mutate,
    isLoading
  };
};
