import {
  GET_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
  GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
  GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
} from '../actionTypes';
import { getProduct } from '../../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @callback GetProductMerchantsLocationsThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {string} variantId - Universal unique identifier of the variant.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load the merchants locations for a specific product variant.
 *
 * @function doGetProductMerchantsLocations
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductMerchantsLocations - Get product merchants locations clients.
 *
 * @returns {GetProductMerchantsLocationsThunkFactory} Thunk factory.
 */
export default getProductMerchantsLocations =>
  (productId, variantId, config) =>
  async (dispatch, getState) => {
    const state = getState();
    const variants = getProduct(state, productId).variants;

    dispatch({
      meta: { productId },
      type: GET_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
    });

    try {
      const result = await getProductMerchantsLocations(
        productId,
        variantId,
        config,
      );

      const variantsWithMerchantsLocations = variants.map(variant => {
        if (variant.id === variantId) {
          return {
            ...variant,
            merchantsLocations: result,
          };
        }

        return variant;
      });

      const productWithMerchantsLocations = {
        id: productId,
        variants: variantsWithMerchantsLocations,
      };

      return dispatch({
        meta: { productId },
        payload: normalize(productWithMerchantsLocations, productSchema),
        type: GET_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: GET_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
      });

      throw error;
    }
  };
