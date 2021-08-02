import { useMutation } from 'react-query';
import { editAppointment } from '../axios/axios-appointments';

// eslint-disable-next-line import/prefer-default-export
export const useEditAppointmentClient = () => {
  const {
    mutate,
    isLoading
  } = useMutation(editAppointment);

  return {
    mutate,
    isLoading
  };
};
