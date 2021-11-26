import {
  FETCH_COLLECT_POINTS_FAILURE,
  FETCH_COLLECT_POINTS_REQUEST,
  FETCH_COLLECT_POINTS_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCollectPoints,
  GetCollectPointsQuery,
  GetCollectPointsResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @typedef {object} FetchCollectPointsQuery
 *
 * @alias FetchCollectPointsQuery
 *
 * @property {number} [orderId] - Universal identifier of the Order.
 */

/**
 * @callback FetchCollectPointsThunkFactory
 * @param {FetchCollectPointsQuery} [query] - Query params to retrieve the collect points.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the collect points.
 *
 * @function fetchCollectPointsFactory
 * @memberof module:checkout/actions/factories
 *
 * @param {Function} getCollectPoints - Get collect points client.
 *
 * @returns {FetchCollectPointsThunkFactory} Thunk factory.
 */
export default (getCollectPoints: GetCollectPoints) =>
  (query: GetCollectPointsQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCollectPointsResponse> => {
    dispatch({
      type: FETCH_COLLECT_POINTS_REQUEST,
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
        type: FETCH_COLLECT_POINTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_COLLECT_POINTS_FAILURE,
      });

      throw error;
    }
  };
