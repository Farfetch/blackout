import {
  areDraftOrdersFetched,
  areDraftOrdersLoading,
  createDraftOrder,
  fetchDraftOrder as fetchDraftOrderAction,
  fetchDraftOrders,
  getCreateDraftOrderError,
  getDraftOrders,
  getDraftOrdersError,
  isCreatingDraftOrder,
  removeDraftOrder as removeDraftOrderAction,
  removeDraftOrderItem as removeDraftOrderItemAction,
  resetDraftOrders,
  type StoreState,
  updateDraftOrder as updateDraftOrderAction,
  updateDraftOrderItem as updateDraftOrderItemAction,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../../helpers/useAction.js';
import type { DraftOrdersQuery } from '@farfetch/blackout-client';
import type { UseDraftOrdersOptions } from './types/index.js';

const useDraftOrders = (
  query: DraftOrdersQuery,
  options?: UseDraftOrdersOptions,
) => {
  const { enableAutoFetch = true, fetchConfig, orderId } = options || {};

  const store = useStore();
  const fetch = useAction(fetchDraftOrders);
  const fetchDraftOrder = useAction(fetchDraftOrderAction);
  const createAction = useAction(createDraftOrder);
  const removeDraftOrderItem = useAction(removeDraftOrderItemAction);
  const removeDraftOrder = useAction(removeDraftOrderAction);
  const updateDraftOrderItem = useAction(updateDraftOrderItemAction);
  const updateDraftOrder = useAction(updateDraftOrderAction);
  const resetAction = useAction(resetDraftOrders);

  const draftOrders = useSelector((state: StoreState) =>
    getDraftOrders(state, query),
  );

  const error = useSelector((state: StoreState) =>
    getDraftOrdersError(state, query),
  );
  const isLoading = useSelector((state: StoreState) =>
    areDraftOrdersLoading(state, query),
  );

  const createError = useSelector((state: StoreState) =>
    orderId ? getCreateDraftOrderError(state, orderId) : null,
  );
  const createIsLoading = useSelector((state: StoreState) =>
    orderId ? isCreatingDraftOrder(state, orderId) : false,
  );

  const isFetched = useSelector((state: StoreState) =>
    areDraftOrdersFetched(state, query),
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = areDraftOrdersLoading(updatedState);
    const updatedIsFetched = areDraftOrdersFetched(updatedState);

    if (!updatedIsFetched && !updatedIsLoading && query && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query, store]);

  return {
    isFetched,
    isLoading,
    createIsLoading,
    error,
    createError,
    draftOrders,
    actions: {
      fetch,
      fetchDraftOrder,
      create: createAction,
      removeDraftOrder,
      removeDraftOrderItem,
      updateDraftOrder,
      updateDraftOrderItem,
      reset: resetAction,
    },
  };
};

export default useDraftOrders;
