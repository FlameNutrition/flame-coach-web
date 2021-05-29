import axios from './axios-flame-coach';

export const enrollmentProcessInit = async (clientUUID, coachUUID) => {
  const data = JSON.stringify({
    client: clientUUID,
    coach: coachUUID
  });

  const config = {
    method: 'post',
    url: '/client/enrollment/init',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const enrollmentProcessFinish = async (clientUUID, accept) => {
  const data = JSON.stringify({
    client: clientUUID,
    accept
  });

  const config = {
    method: 'post',
    url: '/client/enrollment/finish',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const enrollmentProcessBreak = async (clientUUID) => {
  const data = JSON.stringify({
    client: clientUUID
  });

  const config = {
    method: 'post',
    url: '/client/enrollment/break',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const enrollmentProcessStatus = async (clientUUID) => {
  const config = {
    method: 'get',
    url: '/client/enrollment/status',
    headers: {
      clientUUID
    }
  };

  const response = await axios(config);

  return response.data;
};
