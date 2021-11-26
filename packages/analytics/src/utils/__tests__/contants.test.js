import * as constants from '../constants';

describe('constants', () => {
  it('Should export PACKAGE_NAME', () => {
    expect(constants.PACKAGE_NAME).toMatchSnapshot();
  });

  it('Should export CONSENT_KEYS', () => {
    expect(constants.CONSENT_KEYS).toMatchSnapshot();
  });
});
