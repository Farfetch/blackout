import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { Nullable, StateWithoutResult } from '../../types';
import type {
  Order,
  OrderSummary,
} from '@farfetch/blackout-client/orders/types';

export type OrderDetailsState = CombinedState<{
  error: Record<Order['id'], Error | null>;
  isLoading: Record<Order['id'], boolean>;
}>;

export type State = CombinedState<{
  error: Error | null;
  isLoading: boolean;
  result: Nullable<OrderSummary>;
  orderDetails: OrderDetailsState;
  orderReturnOptions: OrderDetailsState;
  ordersList: StateWithoutResult;
  trackings: StateWithoutResult;
  documents: StateWithoutResult;
  orderAvailableItemsActivities: StateWithoutResult;
  orderItemAvailableActivities: StateWithoutResult;
  [k: string]: unknown;
}>;
