import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

const getReqUrl = params =>
  join('/account/v1/addressesprediction/', params.text, {
    query: params.query,
  });

/**
 * @typedef {object} GetPredictionsQuery
 *
 * @alias GetPredictionsQuery
 * @memberof module:addresses/client
 *
 * @property {string} [containerId] - Container identifier to fetch
 * information from.
 * @property {string} [countries] - List of country codes, separated by
 * comma to limit the search within. E.g. United Kingdom, Portugal.
 * @property {number} [sampleSize] - Maximum containers iterations when
 * searching for an address, as a number between 1 and 100. Default is 10.
 */

/**
 * Method responsible for getting the predictions.
 *
 * @function getPredictions
 * @memberof module:addresses/client
 *
 * @param {string} text - String to search for.
 * @param {GetPredictionsQuery} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (text, query, config) =>
  client
    .get(getReqUrl({ text, query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
