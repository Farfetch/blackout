import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCollectPoints,
  GetCollectPointsQuery,
  GetCollectPointsResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @param query  - Query params to retrieve the collect points.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for obtaining the collect points.
 *
 * @param getCollectPoints - Get collect points client.
 *
 * @returns Thunk factory.
 */
export default (getCollectPoints: GetCollectPoints) =>
  (query: GetCollectPointsQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCollectPointsResponse> => {
    try {
      dispatch({
        type: actionTypes.FETCH_COLLECT_POINTS_REQUEST,
      });

      const result = await getCollectPoints(query, config);

      dispatch({
        meta: { id: query.orderId },
        payload: {
          entities: {
            collectpoints: result,
          },
        },
        type: actionTypes.FETCH_COLLECT_POINTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_COLLECT_POINTS_FAILURE,
      });

      throw error;
    }
  };
