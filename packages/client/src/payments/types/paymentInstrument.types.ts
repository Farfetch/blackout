import type {
  Amounts,
  Payer,
  PaymentInstrumentData,
  PaymentMethod,
  ShopperInteraction,
} from './index.js';

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
  method: PaymentMethod;
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
