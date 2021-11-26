import {
  FETCH_PREDICTION_DETAILS_FAILURE,
  FETCH_PREDICTION_DETAILS_REQUEST,
  FETCH_PREDICTION_DETAILS_SUCCESS,
} from '../../actionTypes';

/**
 * @typedef {object} PropsObject
 *
 * @alias PropsObject
 * @memberof module:addresses/client
 *
 * @property {string} predictionId - Prediction identifier.
 */

/**
 * @callback FetchPredictionDetailsThunkFactory
 *
 * @param {PropsObject|object} props - Object containing predictionId.
 * @param {GetPredictionDetailsQuery} [query] - Query params.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load Address details based in the prediction id.
 *
 * @function doGetPredictionDetails
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} getPredictionDetails - Get prediction details client.
 *
 * @returns {FetchPredictionDetailsThunkFactory} Thunk factory.
 */
export default getPredictionDetails =>
  (props, query, config) =>
  async dispatch => {
    dispatch({
      type: FETCH_PREDICTION_DETAILS_REQUEST,
    });

    try {
      const result = await getPredictionDetails(props, query, config);

      dispatch({
        payload: result,
        type: FETCH_PREDICTION_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_PREDICTION_DETAILS_FAILURE,
      });

      throw error;
    }
  };
