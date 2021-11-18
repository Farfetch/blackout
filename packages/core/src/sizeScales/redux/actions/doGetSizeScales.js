import {
  GET_SIZESCALES_FAILURE,
  GET_SIZESCALES_REQUEST,
  GET_SIZESCALES_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import sizeScale from '../../../entities/schemas/sizeScale';

/**
 * @typedef {object} GetSizeScalesQuery
 *
 * @alias GetSizeScalesQuery
 * @memberof module:sizeScales/actions
 *
 * @property {number} [categoryId] - Category id to search for size scale.
 */

/**
 * @callback GetSizeScalesThunkFactory
 * @param {GetSizeScalesQuery} [query] - Query with parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for loading size scales.
 *
 * @function doGetSizeScales
 * @memberof module:sizeScales/actions
 *
 * @param {Function} getSizeScales - Get size scales client.
 *
 * @returns {GetSizeScalesThunkFactory} Thunk factory.
 */
export default getSizeScales => (query, config) => async dispatch => {
  dispatch({
    meta: { query },
    type: GET_SIZESCALES_REQUEST,
  });

  try {
    const result = await getSizeScales(query, config);

    return dispatch({
      meta: { query },
      payload: normalize(result, [sizeScale]),
      type: GET_SIZESCALES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error },
      type: GET_SIZESCALES_FAILURE,
    });

    throw error;
  }
};
