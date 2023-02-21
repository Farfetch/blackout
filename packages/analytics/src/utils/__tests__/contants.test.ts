import * as constants from '../constants';

describe('constants', () => {
  it('Should export PACKAGE_NAME', () => {
    expect(constants.PACKAGE_NAME).toMatchSnapshot();
  });

  it('Should export CONSENT_KEYS', () => {
    expect(constants.CONSENT_KEYS).toMatchSnapshot();
  });

  it('Should export DefaultConsentKeys', () => {
    expect(constants.DefaultConsentKeys).toMatchSnapshot();
  });

  it('Should export CONSENT_CATEGORIES_PROPERTY', () => {
    expect(constants.CONSENT_CATEGORIES_PROPERTY).toBe('consentCategories');
  });
});
