const extractWeightType = (measureType) => {
  if (measureType === undefined) {
    return 'Undefined';
  }

  return measureType.split('/')[0];
};

const extractHeightType = (measureType) => {
  if (measureType === undefined) {
    return 'Undefined';
  }

  return measureType.split('/')[1];
};

export {
  extractWeightType,
  extractHeightType
};
