import type { Amounts, CreditCardData, Payer, ShopperInteraction } from '.';

export enum InstrumentStatus {
  Created,
  Pending,
  Cancelled,
  Authorized,
  Settled,
  Refunded,
}

export type Instrument = {
  id: string;
  method: string;
  option: string;
  amounts: Amounts[];
  status: InstrumentStatus;
  payer: Payer;
  data: CreditCardData;
  installments: {
    quantity: number;
  };
  shopperInteraction: ShopperInteraction;
};
