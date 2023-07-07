import type {
  Amounts,
  PayerAddressType,
  PayerInput,
  PaymentInstrument,
  PaymentIntent,
  ShopperInteraction,
} from './index.js';
import type { Config } from '../../types/index.js';

export type PutPaymentIntentInstrumentData = {
  createToken?: boolean;
  payer?: PayerInput;
  amounts: Amounts[];
  shopperInteraction?: ShopperInteraction;
  payerAddressType?: PayerAddressType;
};

export type PutPaymentIntentInstrument = (
  paymentIntentId: PaymentIntent['id'],
  paymentInstrumentId: PaymentInstrument['id'],
  data: PutPaymentIntentInstrumentData,
  config?: Config,
) => Promise<number>;
