import { version } from '../../../package.json';

export const PACKAGE_VERSION = version;
export const PACKAGE_NAME = '@farfetch/blackout-core/analytics';
export const PACKAGE_NAME_VERSION = `${PACKAGE_NAME}@${PACKAGE_VERSION}`;
export const DefaultConsentKeys = {
  STATISTICS: 'statistics',
  MARKETING: 'marketing',
  PREFERENCES: 'preferences',
};
export const CONSENT_KEYS = [
  DefaultConsentKeys.STATISTICS,
  DefaultConsentKeys.MARKETING,
  DefaultConsentKeys.PREFERENCES,
];
export const CONSENT_CATEGORIES_PROPERTY = 'consentCategories';
