import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import categorySchema from '../../../entities/schemas/category';

/**
 * @callback GetCategoriesTopThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting only the top categories.
 *
 * @function doGetCategoriesTop
 * @memberof module:categories/actions
 *
 * @param {Function} getCategoriesTop - Get categories top client.
 *
 * @returns {GetCategoriesTopThunkFactory} Thunk factory.
 */
export default getCategoriesTop => config => async dispatch => {
  dispatch({
    type: actionTypes.GET_CATEGORIES_TOP_REQUEST,
  });

  try {
    const result = await getCategoriesTop(config);

    dispatch({
      payload: normalize(result, [categorySchema]),
      type: actionTypes.GET_CATEGORIES_TOP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_CATEGORIES_TOP_FAILURE,
    });

    throw error;
  }
};
