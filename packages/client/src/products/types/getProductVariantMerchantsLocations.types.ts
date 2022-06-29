import type { Product } from './product.types';
import type { ProductVariantMerchantLocation } from './productVariantMerchantLocations.types';

export type GetProductVariantMerchantsLocations = (
  id: Product['result']['id'],
  variantId: string,
  config?: Record<string, unknown>,
) => Promise<ProductVariantMerchantLocation[]>;
