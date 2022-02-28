import { name, version } from '../../package.json';

export const PACKAGE_VERSION = version;
export const PACKAGE_NAME = name;
export const PACKAGE_NAME_VERSION = `${PACKAGE_NAME}@${PACKAGE_VERSION}`;
export const CONSENT_KEYS = ['marketing', 'statistics', 'preferences'];
