import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { GetChargesResponse } from '@farfetch/blackout-client/checkout/types';
import type { Nullable } from '../../types';

export interface StateWithoutResult {
  error: Nullable<Error>;
  isLoading: boolean;
}

export interface StateWithResult {
  error: Nullable<Error>;
  isLoading: boolean;
  result: GetChargesResponse | string | null;
}

export type State = CombinedState<{
  error: Nullable<Error>;
  id: number | null;
  isLoading: boolean;
  completePaymentCheckout: StateWithoutResult;
  collectPoints: StateWithoutResult;
  itemTags: StateWithoutResult;
  promoCode: StateWithoutResult;
  tags: StateWithoutResult;
  checkoutDetails: StateWithoutResult;
  giftMessage: StateWithoutResult;
  itemDeliveryProvisioning: StateWithoutResult;
  upgradeItemDeliveryProvisioning: StateWithoutResult;
  charges: StateWithResult;
  deliveryBundleUpgrades: StateWithResult;
}>;
