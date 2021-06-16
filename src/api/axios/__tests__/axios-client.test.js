import {
  getClientContactInformation,
  getClientPersonalData,
  inviteClient,
  updateClientContactInformation,
  updateClientPersonalData
} from '../axios-client';

import mockAxios from 'axios';

describe('axios-client tests', () => {
  it('get client contact information successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getClientContactInformation('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/client/getContactInformation',
      headers: {
        clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f'
      }
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('update client contact information successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const newContactInformation = {
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneCode: '+44',
      phoneNumber: '2233445566',
      countryCode: 'BR'
    };

    const result = await updateClientContactInformation('a65ad74f-4f9f-4b00-98ee-756e454da73f', newContactInformation);

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/client/updateContactInformation',
      headers: {
        clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        firstName: 'First Name',
        lastName: 'Last Name',
        phoneCode: '+44',
        phoneNumber: '2233445566',
        countryCode: 'BR'
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('get client personal data successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getClientPersonalData('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/client/getPersonalData',
      headers: {
        clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f'
      }
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('update client personal information successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const newPersonalInformation = {
      weight: 60.5,
      height: 175,
      genderCode: 'M',
      measureTypeCode: 'KM_CM'
    };

    const result = await updateClientPersonalData('a65ad74f-4f9f-4b00-98ee-756e454da73f', newPersonalInformation);

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/client/updatePersonalData',
      headers: {
        clientIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        weight: 60.5,
        height: 175,
        genderCode: 'M',
        measureTypeCode: 'KM_CM'
      })
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('invite client successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await inviteClient({
      coachIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
      clientEmail: 'test@gmail.com'
    });

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/client/invite?coachIdentifier=a65ad74f-4f9f-4b00-98ee-756e454da73f&clientEmail=test@gmail.com'
    });
    expect(result).toEqual({ response: 'data' });
  });
});
