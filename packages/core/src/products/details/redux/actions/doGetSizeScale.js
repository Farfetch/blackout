// @TODO: Remove this file in version 2.0.0.
import {
  GET_SIZESCALE_FAILURE,
  GET_SIZESCALE_REQUEST,
  GET_SIZESCALE_SUCCESS,
} from '../actionTypes';
import { getProductSizeScaleId } from '../selectors';
import { normalize } from 'normalizr';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../../package.json';
import { warnDeprecatedMethod } from '../../../../helpers';
import sizeScale from '../../../../entities/schemas/sizeScale';

/**
 * @callback GetSizeScaleThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product sizeScale for a given product id.
 *
 * @function doGetSizeScale
 * @memberof module:products/details/actions
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 * In case you need this behavior, use the doGetSizeScale method from
 * "@bw/core/sizeScales/redux".
 *
 * @param {Function} getSizeScale - Get size scale client.
 *
 * @returns {GetSizeScaleThunkFactory} Thunk factory.
 */
export default getSizeScale =>
  (productId, config) =>
  async (dispatch, getState) => {
    warnDeprecatedMethod(
      `${PCKG_NAME}@${PCKG_VERSION}`,
      '@farfetch/blackout-core/products/details/redux/doGetSizeScale',
      '@farfetch/blackout-core/sizeScales/redux/doGetSizeScale',
    );

    const state = getState();
    const scaleId = getProductSizeScaleId(state, productId);

    dispatch({
      payload: { scaleId },
      type: GET_SIZESCALE_REQUEST,
    });

    try {
      const result = await getSizeScale(scaleId, config);

      return dispatch({
        payload: { ...normalize(result, sizeScale), scaleId },
        type: GET_SIZESCALE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, scaleId },
        type: GET_SIZESCALE_FAILURE,
      });

      throw error;
    }
  };
