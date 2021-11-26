import type { Product } from './product.types';
import type { ProductVariantByMerchantLocation } from './productVariantByMerchantLocation.types';

export type GetProductVariantsByMerchantsLocations = (
  id: Product['result']['id'],
  variantId: string,
  config?: Record<string, unknown>,
) => Promise<ProductVariantByMerchantLocation[]>;
