import * as actionTypes from '../actionTypes';
import { buildDesignerResultHash } from '../../utils';
import { isDesignerResultInCache } from '../selectors';
import { normalize } from 'normalizr';
import designerResult from '../../../entities/schemas/designerResult';

/**
 * @callback GetDesignersThunkFactory
 * @param {object} [query] - Query parameters to apply.
 * @param {boolean} [useCache=false] - Flag to allow a caching mechanism for
 * the designers content, to prevent new requests of content already fetched.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets all designers grouped by their first letter.
 *
 * @function doGetDesigners
 * @memberof module:designers/actions
 *
 * @param {Function} getDesigners - Get designers client.
 *
 * @returns {GetDesignersThunkFactory} Thunk factory.
 */
export default getDesigners =>
  (query, useCache = false, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const hash = buildDesignerResultHash(getOptions(getState).subfolder, query);

    dispatch({
      payload: { hash },
      type: actionTypes.SET_DESIGNER_RESULT_HASH,
    });

    // Verify if this designer result already exists
    if (useCache && isDesignerResultInCache(getState(), hash)) {
      return;
    }

    dispatch({
      payload: { hash },
      type: actionTypes.GET_DESIGNERS_REQUEST,
    });

    try {
      const result = await getDesigners(query, config);

      dispatch({
        payload: {
          ...normalize({ hash, ...result }, designerResult),
          hash,
        },
        type: actionTypes.GET_DESIGNERS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, hash },
        type: actionTypes.GET_DESIGNERS_FAILURE,
      });

      throw error;
    }
  };
