import axios from './axios-flame-coach';

// eslint-disable-next-line import/prefer-default-export
export const updatePassword = async (customerEmail, oldPassword, newPassword) => {
  const data = JSON.stringify({
    email: customerEmail,
    oldPassword,
    newPassword
  });

  const config = {
    method: 'post',
    url: '/customer/updatePassword',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  };

  const response = await axios(config);

  return response.data;
};
