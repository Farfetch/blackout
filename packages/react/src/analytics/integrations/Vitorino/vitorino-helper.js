import { ENVIRONMENT_TYPES } from './constants';
import { utils } from '@farfetch/blackout-core/analytics';
import isObject from 'lodash/isObject';

/**
 *
 * Returns the environment from the integration options, with fallback to window.__BUILD_CONTEXT__.env.NODE_ENV.
 *
 * @param {object} options - Vitorino integration options.
 * @param {string} options.environment - The environment to check against that can be either 'prod' or 'sandbox'.
 *
 * @returns {string} - The environment.
 *
 */
export const getEnvironmentFromOptions = options => {
  const { environment } = options;
  const safeEnvironment =
    environment || window?.__BUILD_CONTEXT__?.env?.NODE_ENV;

  return safeEnvironment === ENVIRONMENT_TYPES.prod
    ? ENVIRONMENT_TYPES.prod
    : ENVIRONMENT_TYPES.dev;
};

/**
 * Returns the final result of options for the given integration, with fallback to the original options if the "subOptions" is not an valid object.
 *
 * @param {object} options - Vitorino integration options without additionalOptions.
 * @param {object} fullOptions - Vitorino full integration options.
 * @param {string} integration - The integration option value.
 *
 * @returns {object} - The safe options for the given integration.
 */
export const getSafeOptionsForIntegration = (
  options,
  fullOptions,
  integration,
) => {
  const subOption = fullOptions[integration];
  if (subOption && isObject(subOption) && !Array.isArray(subOption)) {
    return { ...options, ...subOption };
  }

  if (subOption) {
    utils.logger.warn(
      `[Analytics] Vitorino - The value of ${integration} from Vitorino integration options must be an object with ${integration} integration options.`,
    );
  }

  return options;
};
