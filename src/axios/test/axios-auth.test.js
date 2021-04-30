/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-try-expect */
import mockAxios from 'axios';
import { updatePassword } from '../axios-auth';

describe('axios-auth tests', () => {
  it('update password successfully from API', async () => {
    mockAxios.mockResolvedValueOnce({ data: { result: 'true' } });

    expect(mockAxios.create.mock).toBeTruthy();

    const result = await updatePassword('test@gmail.com', 'password01', 'password12345');

    expect(mockAxios).toBeCalledWith({
      method: 'post',
      url: '/customer/updatePassword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        email: 'test@gmail.com',
        oldPassword: 'password01',
        newPassword: 'password12345'
      })
    });
    expect(result).toEqual({ result: 'true' });
  });

  it('update password erroneously from API', async () => {
    mockAxios.mockRejectedValueOnce(new Error('error'));

    expect(mockAxios.create.mock).toBeTruthy();

    try {
      await updatePassword('test@gmail.com', 'password01', 'password12345');
    } catch (err) {
      expect(mockAxios).toBeCalledWith({
        method: 'post',
        url: '/customer/updatePassword',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          email: 'test@gmail.com',
          oldPassword: 'password01',
          newPassword: 'password12345'
        })
      });
      expect(err).toEqual(new Error('error'));
    }
  });
});
