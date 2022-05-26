import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { GetChargesResponse } from '@farfetch/blackout-client/checkout/types';
import type { Nullable } from '../../types';

export interface StateWithoutResult {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
}

export interface StateWithResult {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: GetChargesResponse | string | null;
}

export type State = CombinedState<{
  error: Nullable<BlackoutError>;
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
