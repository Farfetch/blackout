import {
  fetchDraftOrder,
  getDraftOrder,
  getDraftOrderError,
  getRemoveDraftOrderError,
  getUpdateDraftOrderError,
  isLoadingDraftOrder,
  isRemovingDraftOrder,
  isUpdatingDraftOrder,
  removeDraftOrder,
  removeDraftOrderItem,
  type StoreState,
  updateDraftOrder,
  updateDraftOrderItem,
} from '@farfetch/blackout-redux';
import { useSelector } from 'react-redux';
import useAction from '../../../helpers/useAction.js';
import type { DraftOrder } from '@farfetch/blackout-client';

const useDraftOrder = (draftOrderId: DraftOrder['id']) => {
  const fetch = useAction(fetchDraftOrder);
  const removeDraftOrderItemAction = useAction(removeDraftOrderItem);
  const removeDraftOrderAction = useAction(removeDraftOrder);
  const updateDraftOrderItemAction = useAction(updateDraftOrderItem);
  const updateDraftOrderAction = useAction(updateDraftOrder);

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
  const removeIsLoading = useSelector((state: StoreState) =>
    isRemovingDraftOrder(state, draftOrderId),
  );

  const updateError = useSelector((state: StoreState) =>
    getUpdateDraftOrderError(state, draftOrderId),
  );
  const updateIsLoading = useSelector((state: StoreState) =>
    isUpdatingDraftOrder(state, draftOrderId),
  );

  return {
    isLoading,
    removeIsLoading,
    updateIsLoading,
    error,
    removeError,
    updateError,
    draftOrder,
    actions: {
      fetch,
      remove: removeDraftOrderAction,
      removeItem: removeDraftOrderItemAction,
      update: updateDraftOrderAction,
      updateItem: updateDraftOrderItemAction,
    },
  };
};

export default useDraftOrder;
