import type {
  Amounts,
  CreditCardData,
  Instrument,
  Payer,
  PayerAddressType,
  PostInstrumentsResponse,
  ShopperInteraction,
} from '.';
import type { Config } from '../../types';

export type PostInstrumentsData = {
  method: string;
  option: string;
  token: string;
  createToken: boolean;
  payerAddressType?: PayerAddressType;
  payer: Payer;
  amounts: Amounts[];
  data?: CreditCardData;
  shopperInteraction?: ShopperInteraction;
};

export type PostInstruments = (
  id: Instrument['id'],
  data: PostInstrumentsData,
  config?: Config,
) => Promise<PostInstrumentsResponse>;
