import {
  FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
  FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
  FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
} from '../../actionTypes';
import { getProduct } from '../../../entities/selectors';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type {
  GetProductVariantsByMerchantsLocations,
  Product,
  ProductVariantByMerchantLocation,
} from '@farfetch/blackout-client/products/types';
import type { StoreState } from '../../../types';

/**
 * @param productId - Numeric identifier of the product.
 * @param variantId - Universal unique identifier of the variant.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch the
 * merchants locations for a specific product variant.
 *
 * @param getProductVariantsByMerchantsLocations - Get product variants by merchants locations clients.
 *
 * @returns Thunk factory.
 */
const fetchProductVariantsByMerchantsLocationsFactory =
  (
    getProductVariantsByMerchantsLocations: GetProductVariantsByMerchantsLocations,
  ) =>
  (
    productId: Product['result']['id'],
    variantId: string,
    config?: Record<string, unknown>,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
  ): Promise<ProductVariantByMerchantLocation[]> => {
    try {
      const state = getState();
      const variants = getProduct(state, productId)?.variants;

      dispatch({
        meta: { productId },
        type: FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      });

      const result = await getProductVariantsByMerchantsLocations(
        productId,
        variantId,
        config,
      );

      const variantsByMerchantsLocations = variants?.map(variant => {
        if (variant.id === variantId) {
          return {
            ...variant,
            merchantsLocations: result,
          };
        }

        return variant;
      });

      const productWithVariantsByMerchantsLocations = {
        id: productId,
        variants: variantsByMerchantsLocations,
      };

      dispatch({
        meta: { productId },
        payload: normalize(
          productWithVariantsByMerchantsLocations,
          productSchema,
        ),
        type: FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toError(error) },
        type: FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductVariantsByMerchantsLocationsFactory;