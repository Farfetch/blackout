import type { Config } from '../..';
import type { Raffle, RaffleParticipation } from './raffles.types';

export type PostParticipationData = Pick<
  RaffleParticipation,
  | 'userId'
  | 'billingAddressId'
  | 'shippingAddressId'
  | 'productVariantId'
  | 'paymentTokenId'
  | 'trackingCorrelationId'
>;

export type PostRaffleParticipation = (
  raffleId: Raffle['id'],
  data: PostParticipationData,
  config?: Config,
) => Promise<RaffleParticipation>;
