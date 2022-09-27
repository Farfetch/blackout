import type { BlackoutError, Order } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { Nullable, StateWithoutResult } from '../../types';
import type { OrderEntity, OrdersNormalized } from '../../entities';

export type OrderDetailsState = {
  error: Record<Order['id'], BlackoutError | null>;
  isLoading: Record<Order['id'], boolean>;
};

export type OrdersState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: Nullable<OrdersNormalized | Array<OrderEntity['id']>>;
  orderDetails: OrderDetailsState;
  orderReturns: OrderDetailsState;
  orderReturnOptions: OrderDetailsState;
  trackings: StateWithoutResult;
  documents: StateWithoutResult;
  orderAvailableItemsActivities: StateWithoutResult;
  orderItemAvailableActivities: StateWithoutResult;
}>;
