import {
  getDraftOrder,
  getDraftOrderError,
  getRemoveDraftOrderError,
  getUpdateDraftOrderError,
  isDraftOrderFetched,
  isLoadingDraftOrder,
  isLoadingRemoveDraftOrder,
  isUpdatingDraftOrder,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useDraftOrders from './useDraftOrders.js';
import type {
  Config,
  DraftOrder,
  DraftOrderData,
  DraftOrderItem,
  DraftOrdersQuery,
  PatchDraftOrderItemData,
} from '@farfetch/blackout-client';
import type { UseDraftOrderOptions } from './types/index.js';

const useDraftOrder = (
  draftOrderId: DraftOrder['id'],
  query: DraftOrdersQuery,
  options?: UseDraftOrderOptions,
) => {
  const store = useStore();
  const draftOrderIdHookParameter = draftOrderId;
  const queryHookParameter = query;
  const { enableAutoFetch = true, fetchConfig } = options || {};

  const {
    actions: {
      fetchDraftOrder,
      removeDraftOrder,
      removeDraftOrderItem,
      updateDraftOrder,
      updateDraftOrderItem,
    },
  } = useDraftOrders(
    { customerId: '' },
    { enableAutoFetch: false, fetchConfig },
  );

  /**
   * Fetches the draft order. You can override the draft order id to fetch by using
   * the optional `draftOrderId` parameter. However, the output from
   * the hook will respect the order id passed to it and not the override.
   *
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param query - Overrides the query draft order from the hook. If undefined, the `query` passed to the hook will be used instead.
   * @param draftOrderId  - Overrides the draft order id from the hook. If undefined, the `draftOrderId` passed to the hook will be used instead. Note that the output of the hook will respect the `draftOrderId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      query: DraftOrdersQuery = queryHookParameter,
      draftOrderId: DraftOrder['id'] = draftOrderIdHookParameter,
    ) => {
      if (!draftOrderId) {
        return Promise.reject(new Error('No draft order id was specified.'));
      }

      return fetchDraftOrder(draftOrderId, query, config);
    },
    [
      fetchConfig,
      queryHookParameter,
      draftOrderIdHookParameter,
      fetchDraftOrder,
    ],
  );

  /**
   * Remove the draft order. You can override the draft order id to remove draft order by using
   * the optional `draftOrderId` parameter. However, the output from
   * the hook will respect the order id passed to it and not the override.
   *
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param draftOrderId  - Overrides the draft order id from the hook. If undefined, the `draftOrderId` passed to the hook will be used instead. Note that the output of the hook will respect the `draftOrderId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const remove = useCallback(
    (
      config: Config | undefined = fetchConfig,
      draftOrderId: DraftOrder['id'] = draftOrderIdHookParameter,
    ) => {
      if (!draftOrderId) {
        return Promise.reject(new Error('No draft order id was specified.'));
      }

      return removeDraftOrder(draftOrderId, config);
    },
    [fetchConfig, draftOrderIdHookParameter, removeDraftOrder],
  );

  /**
   * Remove the draft order item. You can override the draft order id to remove draft order item by using
   * the optional `draftOrderId` parameter. However, the output from
   * the hook will respect the order id passed to it and not the override.
   *
   * @param itemId - Required the draft order item id.
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param draftOrderId  - Overrides the draft order id from the hook. If undefined, the `draftOrderId` passed to the hook will be used instead. Note that the output of the hook will respect the `draftOrderId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const removeItem = useCallback(
    (
      itemId: DraftOrderItem['id'],
      config: Config | undefined = fetchConfig,
      draftOrderId: DraftOrder['id'] = draftOrderIdHookParameter,
    ) => {
      if (!draftOrderId) {
        return Promise.reject(new Error('No draft order id was specified.'));
      }

      return removeDraftOrderItem(draftOrderId, itemId, config);
    },
    [fetchConfig, draftOrderIdHookParameter, removeDraftOrderItem],
  );

  /**
   * Update the draft order. You can override the draft order id to update draft order by using
   * the optional `draftOrderId` parameter. However, the output from
   * the hook will respect the order id passed to it and not the override.
   *
   * @param data - Required the draft order data from the draft order id.
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param draftOrderId  - Overrides the draft order id from the hook. If undefined, the `draftOrderId` passed to the hook will be used instead. Note that the output of the hook will respect the `draftOrderId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const update = useCallback(
    (
      data: DraftOrderData,
      config: Config | undefined = fetchConfig,
      draftOrderId: DraftOrder['id'] = draftOrderIdHookParameter,
    ) => {
      if (!draftOrderId) {
        return Promise.reject(new Error('No draft order id was specified.'));
      }

      return updateDraftOrder(draftOrderId, data, config);
    },
    [fetchConfig, draftOrderIdHookParameter, updateDraftOrder],
  );

  /**
   * Update the draft order item. You can override the draft order id to update draft order item by using
   * the optional `draftOrderId` parameter. However, the output from
   * the hook will respect the order id passed to it and not the override.
   *
   * @param itemId - Required the draft order item id.
   * @param data - Required the draft order item data to update.
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param draftOrderId  - Overrides the draft order id from the hook. If undefined, the `draftOrderId` passed to the hook will be used instead. Note that the output of the hook will respect the `draftOrderId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const updateItem = useCallback(
    (
      itemId: DraftOrderItem['id'],
      data: PatchDraftOrderItemData,
      config: Config | undefined = fetchConfig,
      draftOrderId: DraftOrder['id'] = draftOrderIdHookParameter,
    ) => {
      if (!draftOrderId) {
        return Promise.reject(new Error('No draft order id was specified.'));
      }

      return updateDraftOrderItem(draftOrderId, itemId, data, config);
    },
    [fetchConfig, draftOrderIdHookParameter, updateDraftOrderItem],
  );

  const error = useSelector((state: StoreState) =>
    getDraftOrderError(state, draftOrderId),
  );

  const draftOrder = useSelector((state: StoreState) =>
    getDraftOrder(state, draftOrderId),
  );

  const isLoading = useSelector((state: StoreState) =>
    isLoadingDraftOrder(state, draftOrderId),
  );

  const removeError = useSelector((state: StoreState) =>
    getRemoveDraftOrderError(state, draftOrderId),
  );
  const isRemoving = useSelector((state: StoreState) =>
    isLoadingRemoveDraftOrder(state, draftOrderId),
  );

  const updateError = useSelector((state: StoreState) =>
    getUpdateDraftOrderError(state, draftOrderId),
  );
  const isUpdating = useSelector((state: StoreState) =>
    isUpdatingDraftOrder(state, draftOrderId),
  );

  const isFetched = useSelector((state: StoreState) =>
    isDraftOrderFetched(state, draftOrderId),
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = isLoadingDraftOrder(updatedState, draftOrderId);
    const updatedIsFetched = isDraftOrderFetched(updatedState, draftOrderId);

    if (
      !updatedIsFetched &&
      !updatedIsLoading &&
      draftOrderId &&
      query &&
      enableAutoFetch
    ) {
      fetch();
    }
  }, [
    draftOrderId,
    enableAutoFetch,
    fetch,
    fetchConfig,
    isFetched,
    isLoading,
    query,
    store,
  ]);

  return {
    isFetched,
    isLoading,
    isRemoving,
    isUpdating,
    error,
    removeError,
    updateError,
    draftOrder,
    actions: {
      fetch,
      remove,
      removeItem,
      update,
      updateItem,
    },
  };
};

export default useDraftOrder;
