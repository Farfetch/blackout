import {
  GET_SIZESCALE_FAILURE,
  GET_SIZESCALE_REQUEST,
  GET_SIZESCALE_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import sizeScale from '../../../entities/schemas/sizeScale';

/**
 * @callback GetSizeScaleThunkFactory
 * @param {number} sizeScaleId - Numeric identifier of the size scale.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product sizeScale for a given size scale id.
 *
 * @function doGetSizeScale
 * @memberof module:sizeScales/actions
 *
 * @param {Function} getSizeScale - Get size scale client.
 *
 * @returns {GetSizeScaleThunkFactory} Thunk factory.
 */
export default getSizeScale => (sizeScaleId, config) => async dispatch => {
  dispatch({
    meta: { sizeScaleId },
    type: GET_SIZESCALE_REQUEST,
  });

  try {
    const result = await getSizeScale(sizeScaleId, config);

    return dispatch({
      meta: { sizeScaleId },
      payload: normalize(result, sizeScale),
      type: GET_SIZESCALE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { sizeScaleId },
      payload: { error },
      type: GET_SIZESCALE_FAILURE,
    });

    throw error;
  }
};
