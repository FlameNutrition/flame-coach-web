import axios from './axios-flame-coach';

export const getClientsCoachPlusClientsAvailableForCoaching = async (coachUUID) => {
  const config = {
    method: 'get',
    url: `/coach/getClientsCoachPlusClientsAvailable?identifier=${coachUUID}`,
    headers: {}
  };

  const response = await axios(config);

  return response.data;
};

export const getClientsCoach = async (coachUUID) => {
  const config = {
    method: 'get',
    url: `/coach/getClientsAccepted?identifier=${coachUUID}`,
    headers: {}
  };

  return axios(config);
};
