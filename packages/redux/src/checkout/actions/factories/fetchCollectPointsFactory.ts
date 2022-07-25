import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCollectPoints,
  GetCollectPointsQuery,
  GetCollectPointsResponse,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for obtaining the collect points.
 *
 * @param getCollectPoints - Get collect points client.
 *
 * @returns Thunk factory.
 */
const fetchCollectPointsFactory =
  (getCollectPoints: GetCollectPoints) =>
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
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_COLLECT_POINTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchCollectPointsFactory;
