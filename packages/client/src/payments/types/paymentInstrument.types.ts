import type {
  Amounts,
  Payer,
  PaymentInstrumentData,
  ShopperInteraction,
} from '.';

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
  data: PaymentInstrumentData;
  installments: {
    quantity: number;
  };
  shopperInteraction: ShopperInteraction;
};
