import axios from './axios-flame-coach';

export const getCoachClientsMetrics = async (coachIdentifier) => {
  const config = {
    method: 'get',
    url: `/metrics/clients?coachIdentifier=${coachIdentifier}`
  };

  const response = await axios(config);

  return response.data;
};
