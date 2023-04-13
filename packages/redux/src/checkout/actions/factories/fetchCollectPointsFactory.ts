import * as actionTypes from '../../actionTypes.js';
import {
  type CollectPoint,
  type Config,
  type GetCollectPoints,
  type GetCollectPointsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import buildCollectPointsQueryHash from '../../helpers/buildCollectPointsQueryHash.js';
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
  (query?: GetCollectPointsQuery, config?: Config) =>
  async (dispatch: Dispatch): Promise<CollectPoint[]> => {
    let hash: undefined | string = undefined;

    try {
      hash = buildCollectPointsQueryHash(query);

      dispatch({
        type: actionTypes.FETCH_COLLECT_POINTS_REQUEST,
        meta: { hash },
      });

      const result = await getCollectPoints(query, config);

      dispatch({
        payload: { result },
        type: actionTypes.FETCH_COLLECT_POINTS_SUCCESS,
        meta: { hash },
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_COLLECT_POINTS_FAILURE,
        meta: { hash },
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCollectPointsFactory;
