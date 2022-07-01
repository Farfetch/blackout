import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSizeGuides,
  SizeGuide,
  SizeGuidesQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { FetchSizeGuidesAction } from '../../types';

/**
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch size
 * guides for a given set of brand ids and category ids. This size guides logic
 * should be used in cases that the project does not have a specific category tree.
 * If your project has a category tree you should use the respective logic from
 * `@farfetch/blackout-redux/products`.
 *
 * @param getSizeGuides - Get size guides client.
 *
 * @returns Thunk factory.
 */
const fetchSizeGuidesFactory =
  (getSizeGuides: GetSizeGuides) =>
  (query?: SizeGuidesQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchSizeGuidesAction>): Promise<SizeGuide[]> => {
    try {
      dispatch({
        meta: { query },
        type: actionTypes.FETCH_SIZE_GUIDES_REQUEST,
      });

      const result = await getSizeGuides(query, config);

      dispatch({
        meta: { query },
        payload: {
          result,
        },
        type: actionTypes.FETCH_SIZE_GUIDES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_SIZE_GUIDES_FAILURE,
      });

      throw error;
    }
  };

export default fetchSizeGuidesFactory;
