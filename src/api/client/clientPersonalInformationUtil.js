const extractWeightType = (measureType: String) => {
  return measureType.split('/')[0];
};

const extractHeightType = (measureType: String) => {
  return measureType.split('/')[1];
};

export {
  extractWeightType,
  extractHeightType
};
