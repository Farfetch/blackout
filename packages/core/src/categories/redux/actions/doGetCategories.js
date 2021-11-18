import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category';

/**
 * @callback GetCategoriesThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting all the categories.
 *
 * @function doGetCategories
 * @memberof module:categories/actions
 *
 * @param {Function} getCategories - Get categories client.
 *
 * @returns {GetCategoriesThunkFactory} Thunk factory.
 */
export default getCategories => config => async dispatch => {
  dispatch({
    type: actionTypes.GET_CATEGORIES_REQUEST,
  });

  try {
    const result = await getCategories(config);

    dispatch({
      payload: normalize(result, [categorySchema]),
      type: actionTypes.GET_CATEGORIES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_CATEGORIES_FAILURE,
    });

    throw error;
  }
};
