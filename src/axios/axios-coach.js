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

  const response = await axios(config);

  return response.data;
};

export const getCoachContactInformation = async (coachIdentifier) => {
  const config = {
    method: 'get',
    url: '/coach/getContactInformation',
    headers: {
      coachIdentifier
    }
  };

  const response = await axios(config);

  return response.data;
};

export const updateCoachContactInformation = async (coachIdentifier, newContactInformation) => {
  const data = JSON.stringify({
    firstName: newContactInformation.firstName,
    lastName: newContactInformation.lastName,
    phoneCode: newContactInformation.phoneCode,
    phoneNumber: newContactInformation.phoneNumber,
    countryCode: newContactInformation.countryCode
  });

  const config = {
    method: 'post',
    url: '/coach/updateContactInformation',
    headers: {
      coachIdentifier,
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};
