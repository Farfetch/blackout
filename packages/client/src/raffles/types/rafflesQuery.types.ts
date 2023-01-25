import type { RaffleStatus } from './raffles.types';

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
