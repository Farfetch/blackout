import type {
  Amounts,
  Payer,
  PayerAddressType,
  PaymentInstrument,
  PostPaymentIntentInstrumentResponse,
  ShopperInteraction,
} from '.';
import type { Config } from '../../types';

export type CreatePaymentInstrumentData = {
  cardHolderName: string;
  cardNumber: string;
  cardExpiryMonth: number;
  cardExpiryYear: number;
  cardCvv: string;
  giftCardNumber: string;
  giftCardCsc: string;
  creditUserId: string;
};

export type PostPaymentIntentInstrumentData = {
  method: string;
  option?: string;
  token?: string;
  createToken?: boolean;
  payerAddressType?: PayerAddressType;
  payer?: Payer;
  amounts: Amounts[];
  data?: CreatePaymentInstrumentData;
  shopperInteraction?: ShopperInteraction;
};

export type PostPaymentIntentInstrument = (
  id: PaymentInstrument['id'],
  data: PostPaymentIntentInstrumentData,
  config?: Config,
) => Promise<PostPaymentIntentInstrumentResponse>;
