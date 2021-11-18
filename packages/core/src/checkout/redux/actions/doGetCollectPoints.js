import {
  GET_COLLECTPOINTS_FAILURE,
  GET_COLLECTPOINTS_REQUEST,
  GET_COLLECTPOINTS_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} GetCollectPointsQuery
 * @property {number} [orderId] - Universal identifier of the Order.
 */

/**
 * @callback GetCollectPointsThunkFactory
 * @param {GetCollectPointsQuery} [query] - Query params to retrieve the collect points.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the collect points.
 *
 * @function doGetCollectPoints
 * @memberof module:checkout/actions
 *
 * @param {Function} getCollectPoints - Get collect points client.
 *
 * @returns {GetCollectPointsThunkFactory} Thunk factory.
 */
export default getCollectPoints => (query, config) => async dispatch => {
  dispatch({
    type: GET_COLLECTPOINTS_REQUEST,
  });

  try {
    const result = await getCollectPoints(query, config);

    dispatch({
      meta: { id: query.orderId },
      payload: {
        entities: {
          collectpoints: result,
        },
      },
      type: GET_COLLECTPOINTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_COLLECTPOINTS_FAILURE,
    });

    throw error;
  }
};
