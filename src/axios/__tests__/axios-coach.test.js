import {
  getClientsCoach,
  getClientsCoachPlusClientsAvailableForCoaching,
  getCoachContactInformation,
  updateCoachContactInformation
} from '../axios-coach';

import mockAxios from 'axios';

describe('axios-coach tests', () => {
  it('get clients coach and client available for coaching successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getClientsCoachPlusClientsAvailableForCoaching('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/coach/getClientsCoachPlusClientsAvailable?identifier=a65ad74f-4f9f-4b00-98ee-756e454da73f',
      headers: {}
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('get clients coach successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getClientsCoach('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/coach/getClientsAccepted?identifier=a65ad74f-4f9f-4b00-98ee-756e454da73f',
      headers: {}
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('get coach contact information successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const result = await getCoachContactInformation('a65ad74f-4f9f-4b00-98ee-756e454da73f');

    expect(mockAxios).toBeCalledWith({
      method: 'get',
      url: '/coach/getContactInformation',
      headers: {
        coachIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f'
      }
    });
    expect(result).toEqual({ response: 'data' });
  });

  it('update coach contact information successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { response: 'data' } });

    const newContactInformation = {
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneCode: '+44',
      phoneNumber: '2233445566',
      countryCode: 'BR'
    };

    const result = await updateCoachContactInformation('a65ad74f-4f9f-4b00-98ee-756e454da73f', newContactInformation);

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/coach/updateContactInformation',
      headers: {
        coachIdentifier: 'a65ad74f-4f9f-4b00-98ee-756e454da73f',
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
});
