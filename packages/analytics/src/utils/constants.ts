// We use a require here to avoid typescript complaining of `package.json` is not
// under rootDir that we would get if we used an import. Typescript apparently ignores
// requires.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('../../package.json');

export const PACKAGE_VERSION = version as string;
export const PACKAGE_NAME = name as string;
export const PACKAGE_NAME_VERSION = `${PACKAGE_NAME}@${PACKAGE_VERSION}`;
export enum DefaultConsentKeys {
  Statistics = 'statistics',
  Marketing = 'marketing',
  Preferences = 'preferences',
}
export const CONSENT_KEYS = [
  DefaultConsentKeys.Statistics,
  DefaultConsentKeys.Marketing,
  DefaultConsentKeys.Preferences,
];

export const CONSENT_CATEGORIES_PROPERTY = 'consentCategories';
export const LOAD_INTEGRATION_TRACK_TYPE = 'loadIntegration';
export const ON_SET_USER_TRACK_TYPE = 'onSetUser';
export const ANALYTICS_UNIQUE_EVENT_ID = '__blackoutAnalyticsEventId';
export const ANALYTICS_UNIQUE_VIEW_ID = '__uniqueViewId';
export const ANALYTICS_PREVIOUS_UNIQUE_VIEW_ID = '__previousUniqueViewId';
export const LAST_FROM_PARAMETER_KEY = '__lastFromParameter';
