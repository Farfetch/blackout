import type { BlackoutError, CheckoutOrder } from '@farfetch/blackout-client';
import type {
  DeleteInstrument,
  GetInstruments,
  Instrument,
  Instruments,
  Intent,
  PostInstruments,
  PutInstruments,
} from '@farfetch/blackout-client/src/payments/types';
import type { User } from '@farfetch/blackout-redux/src/entities/types';

export enum INSTRUMENT_MAPPING {
  CreditCard = 'CreditCard', // Used to create instruments with tokens.
  PayPalExp = 'PayPal',
}

export type HandleCreateInstrumentProps = (
  data: Partial<{
    email: string;
    option: keyof typeof INSTRUMENT_MAPPING;
    tokenId: string | null;
  }>,
) => Promise<void>;

export type HandleDeleteInstrumentProps = (
  instrumentId: Instrument['id'],
) => Promise<void>;

export type HandleUpdateInstrumentProps = (
  intentId: Intent['id'],
  instrumentId: Instrument['id'],
  data: Partial<{
    email: string;
  }>,
) => Promise<void>;

export type UsePayments = (data: { order: CheckoutOrder; user: User }) => {
  instruments: Instruments | null | undefined;
  isInstrumentsLoading: boolean | undefined;
  instrumentsError: BlackoutError | null | undefined;
  createInstrument: PostInstruments;
  deleteInstrument: DeleteInstrument;
  getInstruments: GetInstruments;
  updateInstrument: PutInstruments;
  handleCreateInstrument: HandleCreateInstrumentProps;
  handleDeleteInstrument: HandleDeleteInstrumentProps;
  handleUpdateInstrument: HandleUpdateInstrumentProps;
};
