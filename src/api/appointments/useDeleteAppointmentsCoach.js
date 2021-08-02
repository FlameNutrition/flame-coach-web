import { useMutation } from 'react-query';
import { deleteAppointment } from '../axios/axios-appointments';

// eslint-disable-next-line import/prefer-default-export
export const useDeleteAppointmentClient = () => {
  const {
    mutate,
    isLoading
  } = useMutation(deleteAppointment);

  return {
    mutate,
    isLoading
  };
};
