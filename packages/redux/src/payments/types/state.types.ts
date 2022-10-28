import type {
  Balance,
  PaymentInstrument,
  PaymentIntent,
  PaymentIntentCharge,
  PaymentMethods,
  PaymentToken,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { StateWithResult, StateWithResultArray } from '../../types';

export type PaymentIntentChargeState = PaymentIntentCharge & {
  chargeId: string | null;
};

export type PaymentsState = CombinedState<{
  paymentIntentCharge: StateWithResult<PaymentIntentChargeState>;
  userCreditBalance: StateWithResult<Balance>;
  giftCardBalance: StateWithResult<Balance>;
  paymentIntentInstruments: StateWithResultArray<PaymentInstrument['id']>;
  paymentIntent: StateWithResultArray<PaymentIntent['id']>;
  paymentMethods: StateWithResult<PaymentMethods | PaymentMethods[]>;
  paymentTokens: StateWithResultArray<PaymentToken['id']>;
}>;
