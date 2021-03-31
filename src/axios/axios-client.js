import axios from './axios-flame-coach';

export const getClientContactInformation = async (clientIdentifier) => {
  const config = {
    method: 'get',
    url: '/client/getContactInformation',
    headers: {
      clientIdentifier
    }
  };

  const response = await axios(config);

  return response.data;
};

export const updateClientContactInformation = async (clientIdentifier, newContactInformation) => {
  const data = JSON.stringify({
    firstName: newContactInformation.firstName,
    lastName: newContactInformation.lastName,
    phoneCode: newContactInformation.phoneCode,
    phoneNumber: newContactInformation.phoneNumber,
    countryCode: newContactInformation.countryCode
  });

  const config = {
    method: 'post',
    url: '/client/updateContactInformation',
    headers: {
      clientIdentifier,
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};

export const getClientPersonalData = async (clientIdentifier) => {
  const config = {
    method: 'get',
    url: '/client/getPersonalData',
    headers: {
      clientIdentifier
    }
  };

  const response = await axios(config);

  return response.data;
};

export const updateClientPersonalData = async (clientIdentifier, newContactInformation) => {
  const data = JSON.stringify({
    weight: newContactInformation.weight,
    height: newContactInformation.height,
    genderCode: newContactInformation.genderCode,
    measureTypeCode: newContactInformation.measureTypeCode
  });

  const config = {
    method: 'post',
    url: '/client/updatePersonalData',
    headers: {
      clientIdentifier,
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};
