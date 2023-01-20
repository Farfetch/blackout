import { AnalyticsConstants } from '..';
import { ForterProductionSiteId, ForterSandboxSiteId } from './constants';

/**
 * Returns the default site ID based on the environment specified in the options object.
 *
 * @param {object} options - An object containing information about the current environment.
 * @param {string} options.environment - The environment to check against that can be either
 *                    'prod' or 'sandbox' (every other option will be consider as sandbox).
 *
 * @returns {string} The default site ID for the specified environment.
 *
 */
export function getDefaultSiteId(options) {
  if (options.environment === AnalyticsConstants.ENVIRONMENT_TYPES.prod) {
    return ForterProductionSiteId;
  } else {
    return ForterSandboxSiteId;
  }
}
