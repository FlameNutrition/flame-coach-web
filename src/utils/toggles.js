export const MEASURES = '/measures';

const isEnable = (toggleName) => {
  switch (toggleName) {
    case MEASURES:
      return process.env.NEXT_PUBLIC_TOGGLE_MEASURES === 'true';
    default:
      return true;
  }
};

const isWhitelist = (customerIdentifier) => {
  if (customerIdentifier === undefined || customerIdentifier === null) {
    return false;
  }

  const uuidWhitelist = process.env.NEXT_PUBLIC_UUID_WHITELIST.split(',');
  return uuidWhitelist.includes(customerIdentifier);
};

export const isFeatureEnable = (toggleName, customerIdentifier) => {

  return isEnable(toggleName) || isWhitelist(customerIdentifier);

}
