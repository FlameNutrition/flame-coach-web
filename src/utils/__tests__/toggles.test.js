import { isFeatureEnable, MEASURES } from '../toggles';

describe('toggles tests', () => {

  it('test feature enable method', () => {

    expect(isFeatureEnable(MEASURES, 'dd6483ac-11aa-4eeb-815c-ed565960ad27'))
      .toBeTruthy();
    expect(isFeatureEnable(MEASURES, 'ff6e282c-5b72-4f6e-a8db-3db5e5538448'))
      .toBeTruthy();
    expect(isFeatureEnable(MEASURES, 'e30bf445-2ceb-4d69-9be5-726a57681515'))
      .not
      .toBeTruthy();
    expect(isFeatureEnable(MEASURES, null))
      .not
      .toBeTruthy();
    expect(isFeatureEnable(MEASURES, undefined))
      .not
      .toBeTruthy();
    expect(isFeatureEnable('OTHER', undefined))
      .toBeTruthy();

  });
});
