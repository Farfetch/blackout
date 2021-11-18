import {
  GET_SET_FAILURE,
  GET_SET_REQUEST,
  GET_SET_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import setSchema from '../../../../entities/schemas/set';

/**
 * @callback GetSetThunkFactory
 * @param {number} setId - Numeric identifier of the set.
 * @param {object} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch a specific set by its id.
 *
 * @function doGetSet
 * @memberof module:products/details/actions
 *
 * @param {Function} getSet - Get set client.
 *
 * @returns {GetSetThunkFactory} Thunk factory.
 */
export default getSet =>
  (setId, query = {}, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    dispatch({
      meta: { setId },
      type: GET_SET_REQUEST,
    });

    try {
      const result = await getSet(setId, query, config);
      const { productImgQueryParam } = getOptions(getState);

      return dispatch({
        meta: { setId },
        payload: normalize(
          {
            ...result,
            id: setId,
            // Send this to the entity's `adaptProductImages`
            productImgQueryParam,
          },
          setSchema,
        ),
        type: GET_SET_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { setId },
        payload: { error },
        type: GET_SET_FAILURE,
      });

      throw error;
    }
  };
