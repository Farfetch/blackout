import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { GetChargesResponse } from '@farfetch/blackout-client/checkout/types';
import type { Nullable } from '../../types';
import type { OperationsSuccessResult } from './actions.types';

export interface StateWithoutResult {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
}

export interface StateWithResult<T> {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: T | null;
}

export type State = CombinedState<{
  error: Nullable<BlackoutError>;
  id: number | null;
  isLoading: boolean;
  collectPoints: StateWithoutResult;
  itemTags: StateWithoutResult;
  promoCode: StateWithoutResult;
  tags: StateWithoutResult;
  checkoutDetails: StateWithoutResult;
  giftMessage: StateWithoutResult;
  itemDeliveryProvisioning: StateWithoutResult;
  upgradeItemDeliveryProvisioning: StateWithoutResult;
  charges: StateWithResult<GetChargesResponse>;
  deliveryBundleUpgrades: StateWithResult<string>;
  operation: StateWithoutResult;
  operations: StateWithResult<OperationsSuccessResult>;
  removeOrderItem: StateWithoutResult;
  updateOrderItem: StateWithoutResult;
}>;
