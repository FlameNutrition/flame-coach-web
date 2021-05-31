import { useMutation } from 'react-query';
import { addWeightClient } from '../axios';

// eslint-disable-next-line import/prefer-default-export
export const useAddWeightClient = () => {
  const { mutate, isLoading } = useMutation(addWeightClient);

  return { mutate, isLoading };
};
