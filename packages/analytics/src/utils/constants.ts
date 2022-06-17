// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('../../package.json');

export const PACKAGE_VERSION = version;
export const PACKAGE_NAME = name;
export const PACKAGE_NAME_VERSION = `${PACKAGE_NAME}@${PACKAGE_VERSION}`;
export const CONSENT_KEYS = ['marketing', 'statistics', 'preferences'] as const;
export const LOAD_INTEGRATION_TRACK_TYPE = 'loadIntegration';
export const ON_SET_USER_TRACK_TYPE = 'onSetUser';
