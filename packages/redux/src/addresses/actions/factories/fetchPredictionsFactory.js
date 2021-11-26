import {
  FETCH_PREDICTION_FAILURE,
  FETCH_PREDICTION_REQUEST,
  FETCH_PREDICTION_SUCCESS,
} from '../../actionTypes';

/**
 * @typedef {object} GetPredictionsQuery
 * @property {string} [containerId] - Container identifier to fetch
 * information from.
 * @property {string} [countries] - List of country codes, separated by
 * comma to limit the search within. E.g. United Kingdom, Portugal.
 * @property {number} [sampleSize] - Maximum containers iterations when
 * searching for an address, as a number between 1 and 100. Default is 10.
 */

/**
 * @callback FetchPredictionsThunkFactory
 * @param {string} text - Inserted text.
 * @param {GetPredictionsQuery} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load Predictions based in the inserted text.
 *
 * @function doGetPredictions
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} getPredictions - Get predictions client.
 *
 * @returns {FetchPredictionsThunkFactory} Thunk factory.
 */
export default getPredictions => (text, query, config) => async dispatch => {
  dispatch({
    type: FETCH_PREDICTION_REQUEST,
  });

  try {
    const result = await getPredictions(text, query, config);

    dispatch({
      payload: result,
      type: FETCH_PREDICTION_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_PREDICTION_FAILURE,
    });

    throw error;
  }
};
