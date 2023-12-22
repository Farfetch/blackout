import {
  areDraftOrdersLoading,
  createDraftOrder,
  fetchDraftOrders,
  getDraftOrderCreationError,
  getDraftOrders,
  getDraftOrdersError,
  isCreatingDraftOrder,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useSelector } from 'react-redux';
import useAction from '../../../helpers/useAction.js';
import type {
  CheckoutOrder,
  DraftOrdersQuery,
} from '@farfetch/blackout-client';

const useDraftOrders = (
  query: DraftOrdersQuery,
  orderId?: CheckoutOrder['id'],
) => {
  const fetch = useAction(fetchDraftOrders);
  const createAction = useAction(createDraftOrder);

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
    orderId ? getDraftOrderCreationError(state, orderId) : null,
  );
  const createIsLoading = useSelector((state: StoreState) =>
    orderId ? isCreatingDraftOrder(state, orderId) : false,
  );

  return {
    isLoading,
    createIsLoading,
    error,
    createError,
    draftOrders,
    actions: {
      fetch,
      create: createAction,
    },
  };
};

export default useDraftOrders;
