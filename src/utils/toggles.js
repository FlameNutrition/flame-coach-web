export const MEASURES = 'MEASURES';

const isEnable = (toggleName) => {
  switch (toggleName) {
    case MEASURES:
      return process.env.REACT_APP_TOGGLE_MEASURES === 'false';
    default:
      return true;
  }
};

const isWhitelist = (customerIdentifier) => {
  if (customerIdentifier === undefined || customerIdentifier === null) {
    return false;
  }

  const uuidWhitelist = process.env.REACT_APP_UUID_WHITELIST.split(',');
  return uuidWhitelist.includes(customerIdentifier);
};

export {
  isEnable,
  isWhitelist
};
