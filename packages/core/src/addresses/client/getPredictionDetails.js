import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedProp } from '../../helpers';
import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PropsObject
 *
 * @alias PropsObject
 * @memberof module:addresses/client
 *
 * @property {string} predictionId - Prediction identifier.
 */

/**
 * @typedef {object} GetPredictionDetailsQuery
 *
 * @alias GetPredictionDetailsQuery
 * @memberof module:addresses/client
 *
 * @property {string} [sessionToken] - Session token for Google's session logic.
 */

/**
 * Method responsible for getting the prediction details.
 *
 * @function getPredictionDetails
 * @memberof module:addresses/client
 *
 * @param {PropsObject|object} props - Object containing predictionId.
 * @param {GetPredictionDetailsQuery} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (props, query, config) => {
  const isPropsPredictionId =
    typeof props === 'string' || props instanceof String;
  const args = !isPropsPredictionId
    ? [
        join(
          '/account/v1/addressesprediction',
          props?.predictionId,
          'address',
          { query },
        ),
        config,
      ]
    : [
        join('/account/v1/addressesprediction', props, 'address', { query }),
        query,
      ];

  isPropsPredictionId &&
    warnDeprecatedProp(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      'getPredictionDetails',
      'predictionId',
      'props',
    );

  return client
    .get(...args)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};
