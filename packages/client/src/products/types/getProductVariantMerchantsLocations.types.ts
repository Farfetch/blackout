import type { Product } from './product.types';
import type { ProductVariantMerchantsLocations } from './productVariantMerchantsLocations.types';

export type GetProductVariantMerchantsLocations = (
  id: Product['result']['id'],
  variantId: string,
  config?: Record<string, unknown>,
) => Promise<ProductVariantMerchantsLocations[]>;
