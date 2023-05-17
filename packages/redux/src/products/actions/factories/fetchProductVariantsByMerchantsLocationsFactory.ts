import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type GetProductVariantMerchantsLocations,
  type Product,
  type ProductVariantMerchantLocation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { getProduct } from '../../selectors/product.js';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product.js';
import type { Dispatch } from 'redux';
import type { StoreState } from '../../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch the
 * merchants locations for a specific product variant.
 *
 * @param getProductVariantsByMerchantsLocations - Get product variants by merchants locations clients.
 *
 * @returns Thunk factory.
 */
const fetchProductVariantsByMerchantsLocationsFactory =
  (getProductVariantMerchantsLocations: GetProductVariantMerchantsLocations) =>
  (productId: Product['result']['id'], variantId: string, config?: Config) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
  ): Promise<ProductVariantMerchantLocation[]> => {
    try {
      const state = getState();
      const variants = getProduct(state, productId)?.variants;

      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_REQUEST,
      });

      const result = await getProductVariantMerchantsLocations(
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
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductVariantsByMerchantsLocationsFactory;
