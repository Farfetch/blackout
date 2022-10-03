// We use a require here to avoid typescript complaining of `package.json` is not
// under rootDir that we would get if we used an import. Typescript apparently ignores
// requires.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('../../package.json');

export const PACKAGE_VERSION = version;
export const PACKAGE_NAME = name;
export const PACKAGE_NAME_VERSION = `${PACKAGE_NAME}@${PACKAGE_VERSION}`;
export const CONSENT_KEYS = ['marketing', 'statistics', 'preferences'] as const;
export const LOAD_INTEGRATION_TRACK_TYPE = 'loadIntegration';
export const ON_SET_USER_TRACK_TYPE = 'onSetUser';
export const ANALYTICS_UNIQUE_EVENT_ID = '__uniqueEventId';
