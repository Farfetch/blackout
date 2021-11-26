import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category';
import type {
  Category,
  GetCategories,
} from '@farfetch/blackout-client/categories/types';
import type { Dispatch } from 'redux';
import type { FetchCategoriesAction } from '../../types';

/**
 * @callback FetchCategoriesThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch all categories.
 *
 * @memberof module:categories/actions
 *
 * @param {Function} getCategories - Get categories client.
 *
 * @returns {FetchCategoriesThunkFactory} Thunk factory.
 */
const fetchCategoriesFactory =
  (getCategories: GetCategories) =>
  (config?: Record<string, unknown>) =>
  async (dispatch: Dispatch<FetchCategoriesAction>): Promise<Category[]> => {
    dispatch({
      type: actionTypes.FETCH_CATEGORIES_REQUEST,
    });

    try {
      const result = await getCategories(config);

      dispatch({
        payload: normalize(result, [categorySchema]),
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_CATEGORIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCategoriesFactory;
