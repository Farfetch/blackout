import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProductVariantMerchantsLocations,
  Product,
  ProductVariantMerchantLocation,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { getProduct } from '../../selectors/product';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type { StoreState } from '../../../types';

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
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PRODUCT_MERCHANTS_LOCATIONS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductVariantsByMerchantsLocationsFactory;
