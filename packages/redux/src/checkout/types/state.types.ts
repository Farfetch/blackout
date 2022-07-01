import type {
  BlackoutError,
  CheckoutOrderCharge,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  Nullable,
  StateWithoutResult,
  StateWithResult,
} from '../../types';
import type { OperationsSuccessResult } from './actions.types';

export type CheckoutState = CombinedState<{
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
  checkoutOrderCharge: StateWithResult<CheckoutOrderCharge>;
  deliveryBundleUpgrades: StateWithResult<string>;
  operation: StateWithoutResult;
  operations: StateWithResult<OperationsSuccessResult>;
  removeOrderItem: StateWithoutResult;
  updateOrderItem: StateWithoutResult;
}>;
