import type { BlackoutError, Order } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { HashedFetchUserOrdersQuery } from '../actions/factories/helpers/generateUserOrdersRequestHash.js';
import type { Nullable, StateWithoutResult } from '../../types/index.js';
import type {
  OrderSummariesNormalized,
  ReturnOptionEntity,
} from '../../entities/index.js';

export type OrderDetailsState = {
  error: Record<Order['id'], BlackoutError | null>;
  isLoading: Record<Order['id'], boolean>;
};

export type OrderReturnOptionsState = {
  error: Record<Order['id'], BlackoutError | null>;
  isLoading: Record<Order['id'], boolean>;
  result: Record<Order['id'], Array<ReturnOptionEntity['merchantOrderId']>>;
};

export type OrdersState = CombinedState<{
  documents: StateWithoutResult;
  error: Record<HashedFetchUserOrdersQuery, Nullable<BlackoutError>>;
  isLoading: Record<HashedFetchUserOrdersQuery, boolean>;
  orderAvailableItemsActivities: StateWithoutResult;
  orderDetails: OrderDetailsState;
  orderItemAvailableActivities: StateWithoutResult;
  orderReturnOptions: OrderReturnOptionsState;
  result: Nullable<
    Record<HashedFetchUserOrdersQuery, OrderSummariesNormalized>
  >;
  trackings: StateWithoutResult;
}>;
