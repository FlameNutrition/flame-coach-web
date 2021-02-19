// eslint-disable-next-line import/prefer-default-export
export const getClients = async (clientCoach) => {
  return new Promise((resolve, reject) => {
    if (clientCoach === 1) {
      console.log('promise success');
      resolve(
        [
          {
            clientId: 100,
            email: 'nbento@test.com',
            firstName: 'Nuno',
            lastName: 'Bento'
          },
          {
            clientId: 2,
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'Manual'
          },
          {
            clientId: 3,
            email: 'maria@test.com',
            firstName: 'Maria',
            lastName: 'Teles'
          },
          {
            clientId: 4,
            email: 'jose@test.com',
            firstName: 'Jose',
            lastName: 'Pedro'
          }]
      );
    } else {
      console.log('promise fail');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Problem!');
    }
  });
};
