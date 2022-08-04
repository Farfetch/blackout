import type {
  BlackoutError,
  CheckoutOrderCharge,
} from '@farfetch/blackout-client';
import type { CheckoutOrderOperationsNormalized } from './actions.types';
import type { CombinedState } from 'redux';
import type {
  Nullable,
  StateWithoutResult,
  StateWithResult,
} from '../../types';

export type CheckoutState = CombinedState<{
  error: Nullable<BlackoutError>;
  id: number | null;
  isLoading: boolean;
  collectPoints: StateWithoutResult;
  checkoutOrderTags: StateWithoutResult;
  checkoutOrderPromocode: StateWithoutResult;
  checkoutOrderItemTags: StateWithoutResult;
  checkoutOrderDetails: StateWithoutResult;
  checkoutOrderItems: StateWithoutResult;
  checkoutOrderDeliveryBundleProvisioning: StateWithoutResult;
  checkoutOrderDeliveryBundleUpgradeProvisioning: StateWithoutResult;
  checkoutOrderCharge: StateWithResult<CheckoutOrderCharge>;
  checkoutOrderDeliveryBundleUpgrades: StateWithResult<string>;
  operation: StateWithoutResult;
  operations: StateWithResult<CheckoutOrderOperationsNormalized>;
  removeOrderItem: StateWithoutResult;
  updateOrderItem: StateWithoutResult;
}>;
