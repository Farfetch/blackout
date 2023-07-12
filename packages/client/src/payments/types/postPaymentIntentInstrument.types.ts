import type {
  Amounts,
  Issuer,
  PayerAddressType,
  PayerInput,
  PaymentIntent,
  ShopperInteraction,
} from './index.js';
import type { AxiosResponse } from 'axios';
import type { Config } from '../../types/index.js';

export type CreatePaymentInstrumentData = {
  cardHolderName?: string;
  cardNumber?: string;
  cardExpiryMonth?: number;
  cardExpiryYear?: number;
  cardCvv?: string;
  giftCardNumber?: string;
  giftCardCsc?: string;
  creditUserId?: string;
  issuer?: Issuer['id'];
};

export enum PaymentMethod {
  AfterPay = 'AfterPay',
  Alipay = 'Alipay',
  AlipayWAP = 'AlipayWAP',
  ApplePay = 'ApplePay',
  Boleto = 'Boleto',
  CreditCard = 'CreditCard',
  Credit = 'Credit',
  EBANX = 'EBANX',
  GiftCard = 'GiftCard',
  JdPay = 'JdPay',
  PayPal = 'PayPal',
  KlarnaPayLater = 'KlarnaPayLater',
  Sofort = 'Sofort',
  UnionPay = 'UnionPay',
  WeChat = 'WeChat',
  iDEAL = 'iDEAL',
  HBPay = 'HBPay',
}

export type PostPaymentIntentInstrumentData = {
  method: string;
  option?: string;
  token?: string;
  createToken?: boolean;
  payerAddressType?: PayerAddressType;
  payer?: PayerInput;
  amounts: Amounts[];
  data?: CreatePaymentInstrumentData;
  shopperInteraction?: ShopperInteraction;
};

export type PostPaymentIntentInstrumentResponse = AxiosResponse;

export type PostPaymentIntentInstrument = (
  paymentIntentId: PaymentIntent['id'],
  data: PostPaymentIntentInstrumentData,
  config?: Config,
) => Promise<PostPaymentIntentInstrumentResponse>;
