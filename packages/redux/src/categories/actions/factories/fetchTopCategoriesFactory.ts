import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category';
import type {
  Category,
  GetCategories,
} from '@farfetch/blackout-client/categories/types';
import type { Dispatch } from 'redux';
import type { FetchTopCategoriesAction } from '../../types';

/**
 * @callback FetchTopCategoriesThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch all top categories.
 *
 * @memberof module:categories/actions
 *
 * @param {Function} getTopCategories - Get categories top client.
 *
 * @returns {FetchTopCategoriesThunkFactory} Thunk factory.
 */
const fetchTopCategoriesFactory =
  (getTopCategories: GetCategories) =>
  (config?: Record<string, unknown>) =>
  async (dispatch: Dispatch<FetchTopCategoriesAction>): Promise<Category[]> => {
    dispatch({
      type: actionTypes.FETCH_TOP_CATEGORIES_REQUEST,
    });

    try {
      const result = await getTopCategories(config);

      dispatch({
        payload: normalize(result, [categorySchema]),
        type: actionTypes.FETCH_TOP_CATEGORIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_TOP_CATEGORIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchTopCategoriesFactory;
