import type { Product } from './product.types';

export enum OnlineState {
  NotOnline,
  Processing,
  InQualityControl,
  Approved,
  Online,
}

export type OutfitProduct = {
  outfitId?: number;
  productId: Product['result']['id'];
};

export type Outfit = {
  id: number;
  mainProductId?: Product['result']['id'];
  description?: string;
  countryId?: number;
  dateCreated?: string;
  onlineState?: OnlineState;
  targetTenantId: number;
  products: OutfitProduct[];
};
