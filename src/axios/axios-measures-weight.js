import axios from './axios-flame-coach';

export const getWeightClient = async (clientIdentifier) => {
  const config = {
    method: 'get',
    url: `/client/measures/weight/get?clientIdentifier=${clientIdentifier}`,
    headers: {}
  };

  const response = await axios(config);

  return response.data;
};

export const addWeightClient = async (clientIdentifier, weight, utcDate) => {
  const data = JSON.stringify({
    value: weight,
    date: utcDate.format('YYYY-MM-DD')
  });

  const config = {
    method: 'post',
    url: `/client/measures/weight/add?clientIdentifier=${clientIdentifier}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const updateWeightClient = async (clientIdentifier, identifier, weight, utcDate) => {
  const data = JSON.stringify({
    value: weight,
    date: utcDate.format('YYYY-MM-DD')
  });

  const config = {
    method: 'post',
    url: `/client/measures/weight/edit?clientIdentifier=${clientIdentifier}&identifier=${identifier}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const deleteWeightClient = async (clientIdentifier, identifier) => {
  const config = {
    method: 'delete',
    url: `/client/measures/weight/delete?clientIdentifier=${clientIdentifier}&identifier=${identifier}`,
    headers: {}
  };

  const response = await axios(config);

  return response.data;
};
