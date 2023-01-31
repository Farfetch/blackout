// @TODO: Remove this file in version 2.0.0.
import * as actionTypes from '../actionTypes';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';

/**
 * @callback FetchSiteFeatures
 *
 * @alias FetchSiteFeaturesThunkFactory
 * @memberof module:siteFeatures/actions
 *
 * @param {FetchSiteFeaturesQuery} [query] - Query with parameters to fetch site features.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the site features.
 *
 * @param fetchSiteFeatures
 * @function fetchSiteFeatures
 * @memberof module:siteFeatures/actions
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {Function} getSiteFeatures - Get site features client.
 * @returns {FetchSiteFeaturesThunkFactory} Thunk factory.
 */
export default fetchSiteFeatures => (query, config) => async dispatch => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/siteFeatures/redux/fetchSiteFeatures',
  );

  dispatch({
    type: actionTypes.FETCH_SITE_FEATURES_REQUEST,
  });

  return fetchSiteFeatures(query, config).then(
    result => {
      return dispatch({
        type: actionTypes.FETCH_SITE_FEATURES_SUCCESS,
        payload: {
          result,
        },
      });
    },
    error => {
      return dispatch({
        type: actionTypes.FETCH_SITE_FEATURES_FAILURE,
        payload: {
          error,
        },
      });
    },
  );
};
