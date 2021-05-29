import { isEnable, isWhitelist, MEASURES } from '../toggles';

describe('toggles tests', () => {
  it('test get toggles', async () => {
    expect(isEnable(MEASURES)).not.toBeTruthy();
    expect(isEnable('OTHER')).toBeTruthy();
  });

  it('test get whitelist', async () => {
    expect(isWhitelist('dd6483ac-11aa-4eeb-815c-ed565960ad27')).toBeTruthy();
    expect(isWhitelist('ff6e282c-5b72-4f6e-a8db-3db5e5538448')).toBeTruthy();
    expect(isWhitelist('e30bf445-2ceb-4d69-9be5-726a57681515')).not.toBeTruthy();
    expect(isWhitelist(null)).not.toBeTruthy();
    expect(isWhitelist(undefined)).not.toBeTruthy();
  });
});
