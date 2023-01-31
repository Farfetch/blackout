import {
  GET_PREDICTION_FAILURE,
  GET_PREDICTION_REQUEST,
  GET_PREDICTION_SUCCESS,
} from '../actionTypes';

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
 * @callback GetPredictionsThunkFactory
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
 * @memberof module:addresses/actions
 *
 * @param {Function} getPredictions - Get predictions client.
 *
 * @returns {GetPredictionsThunkFactory} Thunk factory.
 */
export default getPredictions => (text, query, config) => async dispatch => {
  dispatch({
    type: GET_PREDICTION_REQUEST,
  });

  try {
    const result = await getPredictions(text, query, config);

    dispatch({
      payload: result,
      type: GET_PREDICTION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PREDICTION_FAILURE,
    });

    throw error;
  }
};
