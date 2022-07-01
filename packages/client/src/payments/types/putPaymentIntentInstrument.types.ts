import type {
  Amounts,
  Payer,
  PayerAddressType,
  PaymentInstrument,
  PaymentIntent,
  ShopperInteraction,
} from '.';
import type { Config } from '../../types';

export type PutPaymentIntentInstrumentData = {
  createToken?: boolean;
  payer?: Payer;
  amounts: Amounts[];
  shopperInteraction?: ShopperInteraction;
  payerAddressType?: PayerAddressType;
};

export type PutPaymentIntentInstrument = (
  id: PaymentIntent['id'],
  instrumentId: PaymentInstrument['id'],
  data: PutPaymentIntentInstrumentData,
  config?: Config,
) => void;
