import { useMutation } from 'react-query';
import { inviteClient } from '../axios';

// eslint-disable-next-line import/prefer-default-export
export const useInviteClient = () => {
  const {
    mutate,
    isLoading
  } = useMutation(inviteClient);

  return {
    mutate,
    isLoading
  };
};
