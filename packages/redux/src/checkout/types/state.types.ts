import type {
  BlackoutError,
  CheckoutOrderCharge,
  CollectPoint,
} from '@farfetch/blackout-client';
import type { CheckoutOrderOperationsNormalized } from './actions.types.js';
import type { CombinedState } from 'redux';
import type {
  Nullable,
  StateWithoutResult,
  StateWithResult,
} from '../../types/index.js';

export type CollectPointsState = Record<
  string,
  StateWithResult<CollectPoint[] | undefined>
>;

export type CheckoutState = CombinedState<{
  error: Nullable<BlackoutError>;
  id: number | null;
  isLoading: boolean;
  collectPoints: CollectPointsState;
  checkoutOrderTags: StateWithoutResult;
  checkoutOrderPromocodes: StateWithoutResult;
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
  context: StateWithResult<string>;
  contexts: StateWithResult<string[]>;
}>;
