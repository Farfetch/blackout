export enum RaffleStatus {
  Draft = 'Draft',
  Ready = 'Ready',
  AcceptingEntries = 'AcceptingEntries',
  EntriesClosed = 'EntriesClosed',
  WinnersSelection = 'WinnersSelection',
  DrawClosed = 'DrawClosed',
  Closed = 'Closed',
}

export type Raffle = {
  id: string;
  status: RaffleStatus;
  title: string | null;
  productId: number | null;
  merchantId: number | null;
  startDate: string | null;
  endDate: string | null;
  endEntriesDate: string | null;
  drawDate: string | null;
};

export type Raffles = {
  entries: Raffle[] | null;
  nextToken: string | null;
};

export type RaffleEstimation = {
  currencyCode?: string;
  estimatedPrice: number;
  estimatedShippingPrice: number;
};

export enum RaffleParticipationStatus {
  Participated = 'Participated',
  Cancelled = 'Cancelled',
  Winner = 'Winner',
}

export type RaffleParticipation = {
  userId: string;
  raffleId: Raffle['id'];
  id: string;
  estimation: RaffleEstimation;
  status: RaffleParticipationStatus;
  billingAddressId: string;
  shippingAddressId: string;
  productVariantId: string;
  paymentTokenId: string;
  trackingCorrelationId?: string | null;
};
