import type { RaffleStatus } from './raffles.types.js';

export type RafflesQuery = {
  status?: RaffleStatus;
  productId?: number;
  pageSize?: number;
  pageToken?: string;
};

export type RaffleEstimationQuery = {
  productVariantId?: string;
  shippingAddressId?: string;
};
