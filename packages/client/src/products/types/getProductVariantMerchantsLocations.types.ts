import type { Config } from '../../types/index.js';
import type { Product } from './product.types.js';
import type { ProductVariantMerchantLocation } from '././productVariantMerchantLocation.types.js';

export type GetProductVariantMerchantsLocations = (
  id: Product['result']['id'],
  variantId: string,
  config?: Config,
) => Promise<ProductVariantMerchantLocation[]>;
