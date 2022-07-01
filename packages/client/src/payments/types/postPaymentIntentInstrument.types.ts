import type {
  Amounts,
  CreditCardData,
  Payer,
  PayerAddressType,
  PaymentInstrument,
  PostPaymentIntentInstrumentResponse,
  ShopperInteraction,
} from '.';
import type { Config } from '../../types';

export type PostPaymentIntentInstrumentData = {
  method: string;
  option?: string;
  token?: string;
  createToken?: boolean;
  payerAddressType?: PayerAddressType;
  payer?: Payer;
  amounts: Amounts[];
  data?: CreditCardData;
  shopperInteraction?: ShopperInteraction;
};

export type PostPaymentIntentInstrument = (
  id: PaymentInstrument['id'],
  data: PostPaymentIntentInstrumentData,
  config?: Config,
) => Promise<PostPaymentIntentInstrumentResponse>;
