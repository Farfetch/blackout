// @TODO: Remove this file in version 2.0.0.
/**
 * @module siteFeatures/selectors
 * @category SiteFeatures
 * @subcategory Selectors
 */
import { createSelector } from 'reselect';
import { getError, getIsLoading, getResult } from './reducer';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedMethod } from '../../helpers';

/**
 * Returns the siteFeatures error.
 *
 * @function
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Error.
 */
export const getSiteFeaturesError = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-client/siteFeatures/redux/getSiteFeaturesError',
  );

  return getError(state.siteFeatures);
};

/**
 * Returns the siteFeatures result.
 *
 * @function
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {object} state - Application state.
 *
 * @returns {object} SiteFeatures.
 */
export const getSiteFeaturesResult = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-client/siteFeatures/redux/getSiteFeaturesResult',
  );

  return getResult(state.siteFeatures);
};

/**
 * Check if doGetSiteFeatures is loading.
 *
 * @function
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} DoGetSiteFeatures loading status.
 */
export const getSiteFeaturesIsLoading = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-client/siteFeatures/redux/getSiteFeaturesIsLoading',
  );

  return getIsLoading(state.siteFeatures);
};

/**
 * Check if siteFeature is enabled.
 *
 * @function
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} SiteFeature enabled status.
 */
export const getSiteFeaturesIsEnabled = createSelector(
  getSiteFeaturesResult,
  (state, siteFeatureName) => siteFeatureName,
  (result, siteFeatureName) =>
    result.find(({ name }) => {
      warnDeprecatedMethod(
        `${PCKG_NAME}@${PCKG_VERSION}`,
        '@farfetch/blackout-client/siteFeatures/redux/getSiteFeaturesIsLoading',
      );
      return name === siteFeatureName;
    })?.status,
);
