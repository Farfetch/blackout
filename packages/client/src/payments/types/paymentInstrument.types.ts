import type { Amounts, CreditCardData, Payer, ShopperInteraction } from '.';

export enum PaymentInstrumentStatus {
  Created,
  Pending,
  Cancelled,
  Authorized,
  Settled,
  Refunded,
}

export type PaymentInstrument = {
  id: string;
  method: string;
  option: string;
  amounts: Amounts[];
  status: PaymentInstrumentStatus;
  payer: Payer;
  data: CreditCardData;
  installments: {
    quantity: number;
  };
  shopperInteraction: ShopperInteraction;
};
