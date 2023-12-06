import type { BlackoutError, DraftOrder } from '@farfetch/blackout-client';

export type DraftOrderNormalized = Omit<DraftOrdersEntries, 'entries'> & {
  entries: Array<DraftOrder['id'] | string> | null;
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
      result: DraftOrderNormalized | null;
      isLoading: boolean;
      error: BlackoutError | null;
    }
  >;
  draftOrderCreations: Record<
    DraftOrder['id'],
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
