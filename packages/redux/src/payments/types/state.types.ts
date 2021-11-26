import type {
  Balance,
  Charges,
  Instrument,
  Intent,
  PaymentMethod,
  PaymentToken,
} from '@farfetch/blackout-client/payments/types';
import type { CombinedState } from 'redux';
import type { StateWithResult, StateWithResultArray } from '../../types';

export type State = CombinedState<{
  charges: StateWithResult<Charges>;
  creditBalance: StateWithResult<Balance>;
  giftCardBalance: StateWithResult<Balance>;
  instruments: StateWithResultArray<Instrument['id']>;
  intent: StateWithResultArray<Intent['id']>;
  paymentMethods: StateWithResultArray<PaymentMethod>;
  tokens: StateWithResultArray<PaymentToken['id']>;
}>;
