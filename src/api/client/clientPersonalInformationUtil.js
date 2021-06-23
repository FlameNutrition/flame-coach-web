const extractWeightType = (measureType) => {
  return measureType.split('/')[0];
};

const extractHeightType = (measureType) => {
  return measureType.split('/')[1];
};

export {
  extractWeightType,
  extractHeightType
};
