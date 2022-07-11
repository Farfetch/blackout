import type {
  Amounts,
  Instrument,
  Intent,
  Payer,
  PayerAddressType,
  ShopperInteraction,
} from '.';
import type { Config } from '../../types';

export type PutInstrumentsData = {
  createToken: boolean;
  payer: Payer;
  amounts: Amounts[];
  shopperInteraction?: ShopperInteraction;
  payerAddressType?: PayerAddressType;
};

export type PutInstruments = (
  id: Intent['id'],
  instrumentId: Instrument['id'],
  data: PutInstrumentsData,
  config?: Config,
) => void;
