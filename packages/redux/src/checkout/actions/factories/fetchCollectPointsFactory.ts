import * as actionTypes from '../../actionTypes.js';
import {
  type CollectPoint,
  type Config,
  type GetCollectPoints,
  type GetCollectPointsQuery,
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
  async (dispatch: Dispatch): Promise<CollectPoint[]> => {
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_COLLECT_POINTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCollectPointsFactory;
