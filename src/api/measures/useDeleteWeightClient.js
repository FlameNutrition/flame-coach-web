import { useMutation } from 'react-query';
import { deleteWeightClient } from '../axios';

// eslint-disable-next-line import/prefer-default-export
export const useDeleteWeightClient = () => {
  const { mutate, isLoading } = useMutation(deleteWeightClient);

  return { mutate, isLoading };
};
