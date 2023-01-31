import {
  DEHYDRATE_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
} from '../actionTypes';
import { isProductHydrated } from '../selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @typedef {object} GetProductDetailsQuery
 *
 * @alias GetProductDetailsQuery
 * @memberof module:products/client
 *
 * @property {string} [fields] - (To be exposed by BE) - Get the specified
 * field of the product, separated by commas, improving performance
 * (e.g., id, shortDescription, brand).
 * @property {number} [merchantId] - Specific merchant id to get the product.
 * @property {string} [perferredSize] - Specific size to get the product.
 */

/**
 * @callback GetProductDetailsThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {GetProductDetailsQuery} [query] - Query parameters to apply to the
 * request.
 * @param {boolean} forceDispatch - If true, the request should be done and the
 * data from first render should be ignored (isHydrated).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product details for a given product id.
 *
 * @function doGetProductDetails
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductDetails - Get product details client.
 *
 * @returns {GetProductDetailsThunkFactory} Thunk factory.
 */
export default getProductDetails =>
  (productId, query = {}, forceDispatch = false, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    const isHydrated = isProductHydrated(getState(), productId);

    // Check if product data is already fetched, if we dont want
    // to force the dispatch.
    // If yes, let the calling code know there's nothing to wait for.
    // If not, dispatch an action to fetch the product data.
    if (isHydrated && !forceDispatch) {
      return dispatch({
        payload: { productId },
        type: DEHYDRATE_PRODUCT_DETAILS,
      });
    }

    dispatch({
      payload: { productId },
      type: GET_PRODUCT_DETAILS_REQUEST,
    });

    try {
      const result = await getProductDetails(productId, query, config);
      const {
        result: { id, ...productData },
        ...otherData
      } = result;
      const { productImgQueryParam } = getOptions(getState);
      const details = {
        isDuplicated: Number(productId) !== id,
        id: productId,
        // Send this to the entity's `adaptProductImages`
        productImgQueryParam,
        ...productData,
        // Other data like breadCrumbs, complementaryInformation,
        // imageGroups, sizes, slug, price, recommendedSet, colorSwatch...
        ...otherData,
      };

      return dispatch({
        payload: { ...normalize(details, productSchema), productId },
        type: GET_PRODUCT_DETAILS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, productId },
        type: GET_PRODUCT_DETAILS_FAILURE,
      });

      throw error;
    }
  };
