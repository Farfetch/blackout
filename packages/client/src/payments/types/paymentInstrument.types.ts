import type {
  Amounts,
  Payer,
  PaymentInstrumentData,
  ShopperInteraction,
} from './index.js';

export type InstrumentInstallment = {
  quantity: number;
};

export enum PaymentInstrumentStatus {
  Created = 'Created',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Authorized = 'Authorized',
  Settled = 'Settled',
  Refunded = 'Refunded',
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
