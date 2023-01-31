import {
  GET_PREDICTION_DETAILS_FAILURE,
  GET_PREDICTION_DETAILS_REQUEST,
  GET_PREDICTION_DETAILS_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} PropsObject
 *
 * @alias PropsObject
 * @memberof module:addresses/client
 *
 * @property {string} predictionId - Prediction identifier.
 */

/**
 * @callback GetPredictionDetailsThunkFactory
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
 * @memberof module:addresses/actions
 *
 * @param {Function} getPredictionDetails - Get prediction details client.
 *
 * @returns {GetPredictionDetailsThunkFactory} Thunk factory.
 */
export default getPredictionDetails =>
  (props, query, config) =>
  async dispatch => {
    dispatch({
      type: GET_PREDICTION_DETAILS_REQUEST,
    });

    const isPropsPredictionId =
      typeof props === 'string' || props instanceof String;

    try {
      const result = isPropsPredictionId
        ? await getPredictionDetails(props, query)
        : await getPredictionDetails(props, query, config);

      dispatch({
        payload: result,
        type: GET_PREDICTION_DETAILS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PREDICTION_DETAILS_FAILURE,
      });

      throw error;
    }
  };
