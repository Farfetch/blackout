import type {
  BlackoutError,
  CheckoutOrder,
  DraftOrder,
  PagedResponseWithPageSize,
} from '@farfetch/blackout-client';

export type DraftOrdersNormalized = Omit<
  PagedResponseWithPageSize<DraftOrder>,
  'entries'
> & {
  entries: Array<DraftOrder['id']>;
};

export type DraftOrdersState = {
  draftOrder: Record<
    DraftOrder['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
  allDraftOrders: Record<
    string,
    {
      result: DraftOrdersNormalized | null;
      isLoading: boolean;
      error: BlackoutError | null;
    }
  >;
  draftOrderCreations: Record<
    CheckoutOrder['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
  updateDraftOrder: Record<
    DraftOrder['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
  removeDraftOrder: Record<
    DraftOrder['id'],
    { error: BlackoutError | null; isLoading: boolean }
  >;
};
