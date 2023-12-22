import type {
  BlackoutError,
  CheckoutOrder,
  DraftOrder,
} from '@farfetch/blackout-client';

export type DraftOrdersNormalized = Omit<DraftOrdersEntries, 'entries'> & {
  entries: Array<DraftOrder['id']> | null;
};

export type DraftOrdersEntries = {
  entries: DraftOrder[] | null;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalItems: number;
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
