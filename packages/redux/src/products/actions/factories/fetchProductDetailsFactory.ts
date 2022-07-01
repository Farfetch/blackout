import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProduct,
  Product,
  ProductDetailsQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { isProductHydrated } from '../../selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type { GetOptionsArgument, StoreState } from '../../../types';

/**
 * @param productId     - Numeric identifier of the product.
 * @param query         - Query parameters to apply to the request.
 * @param forceDispatch - If true, the request should be done and the data from first render should be
 *                        ignored (isHydrated).
 * @param config        - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * details for a given product id.
 *
 * @param getProductDetails - Get product details client.
 *
 * @returns Thunk factory.
 */
export const fetchProductDetailsFactory =
  (getProductDetails: GetProduct) =>
  (
    productId: Product['result']['id'],
    query: ProductDetailsQuery = {},
    forceDispatch = false,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<Product | undefined> => {
    try {
      const isHydrated = isProductHydrated(getState(), productId);
      // Check if product data is already fetched, if we don't want
      // to force the dispatch.
      // If yes, let the calling code know there's nothing to wait for.
      // If not, dispatch an action to fetch the product data.
      if (isHydrated && !forceDispatch) {
        dispatch({
          meta: { productId },
          type: actionTypes.DEHYDRATE_PRODUCT_DETAILS,
        });

        return;
      }

      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
      });

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
        type: actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PRODUCT_DETAILS_FAILURE,
      });

      throw error;
    }
  };
