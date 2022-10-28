import type {
  Amounts,
  PayerAddressType,
  PayerInput,
  PaymentInstrument,
  PaymentIntent,
  ShopperInteraction,
} from '.';
import type { Config } from '../../types';

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
) => void;
