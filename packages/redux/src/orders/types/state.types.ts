import type {
  BlackoutError,
  Order,
  OrderSummary,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { Nullable, StateWithoutResult } from '../../types';

export type OrderDetailsState = CombinedState<{
  error: Record<Order['id'], BlackoutError | null>;
  isLoading: Record<Order['id'], boolean>;
}>;

export type OrdersState = CombinedState<{
  error: BlackoutError | null;
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
