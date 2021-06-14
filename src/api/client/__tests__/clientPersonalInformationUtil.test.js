import { extractHeightType, extractWeightType } from '../clientPersonalInformationUtil';

describe('clientPersonalInformationUtil tests', () => {
  it('extract weight client type', async () => {
    expect('Kg')
      .toStrictEqual(extractWeightType('Kg/cm'));
  });

  it('extract height client type', async () => {
    expect('cm')
      .toStrictEqual(extractHeightType('Kg/cm'));
  });
});
