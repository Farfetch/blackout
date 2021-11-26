import {
  DEHYDRATE_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
} from '../../actionTypes';
import { isProductHydrated } from '../../selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';
import type {
  GetProductDetails,
  Product,
  ProductDetailsQuery,
} from '@farfetch/blackout-client/products/types';

/**
 * @typedef {object} FetchProductDetailsQuery
 *
 * @alias FetchProductDetailsQuery
 * @memberof module:products/client
 *
 * @property {string} [fields] - (To be exposed by BE) - Get the specified
 * field of the product, separated by commas, improving performance
 * (e.g., id, shortDescription, brand).
 * @property {number} [merchantId] - Specific merchant id to get the product.
 * @property {string} [perferredSize] - Specific size to get the product.
 */

/**
 * @callback FetchProductDetailsThunkFactory
 *
 * @param {number} productId - Numeric identifier of the product.
 * @param {FetchProductDetailsQuery} [query] - Query parameters to apply to the
 * request.
 * @param {boolean} forceDispatch - If true, the request should be done and the
 * data from first render should be ignored (isHydrated).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * details for a given product id.
 *
 * @memberof module:products/actions/factories
 *
 * @param {Function} getProductDetails - Get product details client.
 *
 * @returns {FetchProductDetailsThunkFactory} Thunk factory.
 */
const fetchProductDetailsFactory =
  (getProductDetails: GetProductDetails) =>
  (
    productId: Product['result']['id'],
    query: ProductDetailsQuery = {},
    forceDispatch = false,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Product | undefined> => {
    const isHydrated = isProductHydrated(getState(), productId);
    // Check if product data is already fetched, if we don't want
    // to force the dispatch.
    // If yes, let the calling code know there's nothing to wait for.
    // If not, dispatch an action to fetch the product data.
    if (isHydrated && !forceDispatch) {
      dispatch({
        meta: { productId },
        type: DEHYDRATE_PRODUCT_DETAILS,
      });

      return;
    }

    dispatch({
      meta: { productId },
      type: FETCH_PRODUCT_DETAILS_REQUEST,
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

      dispatch({
        meta: { productId },
        payload: normalize(details, productSchema),
        type: FETCH_PRODUCT_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: FETCH_PRODUCT_DETAILS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductDetailsFactory;
