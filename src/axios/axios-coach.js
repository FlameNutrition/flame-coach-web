import axios from './axios-flame-coach';

// eslint-disable-next-line import/prefer-default-export
export const getClientsCoachPlusClientsAvailableForCoaching = async (coachUUID) => {
  const config = {
    method: 'get',
    url: `/coach/getClientsCoachPlusClientsAvailable?identifier=${coachUUID}`,
    headers: {}
  };

  return axios(config);
};
