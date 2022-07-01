import type { Config } from '../../types';
import type { Product } from './product.types';
import type { ProductVariantMerchantLocation } from '././productVariantMerchantLocation.types';

export type GetProductVariantMerchantsLocations = (
  id: Product['result']['id'],
  variantId: string,
  config?: Config,
) => Promise<ProductVariantMerchantLocation[]>;
