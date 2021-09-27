import axios from './axios-flame-coach';

export const getIncomes = async (coachIdentifier, from, to, aggregateType) => {
  const config = {
    method: 'get',
    url: `/income/coach/getAcceptedIncomes?coachIdentifier=${coachIdentifier}&from=${from}&to=${to}&aggregateType=${aggregateType}`
  };

  const response = await axios(config);

  return response.data;
};
