const user1 = {
  avatar: '/static/images/avatars/avatar_6.png',
  firstName: 'Nuno',
  lastName: 'Bento',
  fullName: 'Nuno Bento',
  email: 'nbento@gmail.com',
  phone: '',
  codePhone: '+351',
  height: 0,
  weight: 0,
  gender: 'male',
  country: 'USA',
  measure: 'kg/cm',
  city: 'Los Angeles',
};

const user2 = {
  avatar: '/static/images/avatars/avatar_6.png',
  firstName: 'Katarina',
  lastName: 'Smith',
  name: 'Katarina Smith',
  email: 'demo@devias.io',
  phone: '',
  codePhone: '+351',
  height: 0,
  weight: 0,
  gender: 'male',
  country: 'USA',
  measure: 'kg/cm',
  city: 'Los Angeles',
};

// eslint-disable-next-line import/prefer-default-export
export const getUserDetails = async (userUUID) => {
  return new Promise((resolve, reject) => {
    if (userUUID !== null) {
      console.log('promise success');
      resolve(userUUID === 1 ? user1 : user2);
    } else {
      console.log('promise fail');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Problem!');
    }
  });
};

export const updateUserDetails = async (userDetails) => {
  return new Promise((resolve, reject) => {
    if (userDetails !== null) {
      console.log('promise success');
    } else {
      console.log('promise fail');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Problem!');
    }
  });
};
