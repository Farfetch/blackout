import * as fromEntities from '../../../entities/selectors/entity.js';
import * as selectors from '../selectors.js';
import {
  customerId,
  draftOrderId,
  mockDraftOrderState,
  mockFetchDraftOrdersNormalizedPayload,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import {
  type DraftOrdersQuery,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { checkoutId as orderId } from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import type { StoreState } from '../../../types/index.js';

describe('draftOrders redux selectors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isCreatingDraftOrder', () => {
    it('should return the loading status for a draft order creation request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.draftOrderCreations[orderId]
          ?.isLoading;

      expect(
        selectors.isCreatingDraftOrder(
          mockDraftOrderState as StoreState,
          orderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getDraftOrderCreationError', () => {
    it('should return the error status for a draft order creation request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.draftOrderCreations[orderId]?.error;

      expect(
        selectors.getDraftOrderCreationError(
          mockDraftOrderState as StoreState,
          orderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getDraftOrders', () => {
    it('should return an array of draft orders', () => {
      const expectedResult = Object.values(
        mockFetchDraftOrdersNormalizedPayload.entities.draftOrders,
      );
      const spy = jest.spyOn(fromEntities, 'getEntities');
      const query = { customerId };

      expect(
        selectors.getDraftOrders(mockDraftOrderState as StoreState, query),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockDraftOrderState, 'draftOrders');
    });

    it('should return an empty object when draft orders is undefined', () => {
      const state = {
        entities: {},
        draftOrders: { allDraftOrders: {} },
      } as StoreState;
      const query = { customerId };

      expect(selectors.getDraftOrders(state, query)).toEqual([]);
    });
  });

  describe('getDraftOrder', () => {
    it('should return a draft order', () => {
      const expectedResult =
        mockFetchDraftOrdersNormalizedPayload.entities.draftOrders[
          draftOrderId
        ];

      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getDraftOrder(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockDraftOrderState,
        'draftOrders',
        draftOrderId,
      );
    });
  });

  describe('areDraftOrdersLoading', () => {
    it('should return the loading status for the draft order request', () => {
      const hash = `?customerid=${customerId}` as const;

      const expectedResult =
        mockDraftOrderState.draftOrders?.allDraftOrders[hash]?.isLoading;
      const query = { customerId };

      expect(
        selectors.areDraftOrdersLoading(
          mockDraftOrderState as StoreState,
          query as DraftOrdersQuery,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getDraftOrdersError', () => {
    it('should return the error status for the draft order request', () => {
      const hash = `?customerid=${customerId}` as const;
      const expectedResult =
        mockDraftOrderState.draftOrders?.allDraftOrders[hash]?.error;
      const query = { customerId };

      expect(
        selectors.getDraftOrdersError(
          mockDraftOrderState as StoreState,
          query as DraftOrdersQuery,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('areDraftOrdersFetched', () => {
    const hash = `?customerid=${customerId}`;
    const query = { customerId };

    it('should return true if draft orders fetch request succeeded', () => {
      expect(
        selectors.areDraftOrdersFetched(
          mockDraftOrderState as StoreState,
          query as DraftOrdersQuery,
        ),
      ).toBe(true);
    });

    it('should return true if draft orders fetch request failed', () => {
      const mockStateWithError = {
        ...mockDraftOrderState,
        draftOrders: {
          allDraftOrders: {
            [hash]: {
              result: {
                entries: [draftOrderId],
                pageSize: 0,
                pageNumber: 0,
                totalPages: 0,
                totalItems: 0,
              },
              isLoading: false,
              error: toBlackoutError(new Error('error')),
            },
          },
        },
      };

      expect(
        selectors.areDraftOrdersFetched(
          mockStateWithError as unknown as StoreState,
          query as DraftOrdersQuery,
        ),
      ).toBe(true);
    });

    it('should return false if there is an ongoing fetch request', () => {
      const mockStateLoading = {
        ...mockDraftOrderState,
        draftOrders: {
          allDraftOrders: {
            [hash]: {
              result: {
                entries: [draftOrderId],
                pageSize: 0,
                pageNumber: 0,
                totalPages: 0,
                totalItems: 0,
              },
              isLoading: true,
              error: null,
            },
          },
        },
      };

      expect(
        selectors.areDraftOrdersFetched(
          mockStateLoading as unknown as StoreState,
          query as DraftOrdersQuery,
        ),
      ).toBe(false);
    });
  });

  describe('isLoadingDraftOrder', () => {
    it('should return the loading status for a draft order request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.draftOrder[draftOrderId]?.isLoading;

      expect(
        selectors.isLoadingDraftOrder(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getDraftOrderError', () => {
    it('should return the error status for a draft order request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.draftOrder[draftOrderId]?.error;

      expect(
        selectors.getDraftOrderError(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('isDraftOrderFetched', () => {
    it('should return true if the draft order fetch request succeeded', () => {
      expect(
        selectors.isDraftOrderFetched(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toBe(true);
    });

    it('should return true if the draft order fetch request failed', () => {
      const mockStateWithError = {
        ...mockDraftOrderState,
        draftOrders: {
          draftOrder: {
            [draftOrderId]: {
              isLoading: false,
              error: toBlackoutError(new Error('error')),
            },
          },
        },
      };

      expect(
        selectors.isDraftOrderFetched(
          mockStateWithError as unknown as StoreState,
          draftOrderId,
        ),
      ).toBe(true);
    });

    it('should return false if there is an ongoing fetch request', () => {
      const mockStateLoading = {
        ...mockDraftOrderState,
        draftOrders: {
          draftOrder: {
            [draftOrderId]: {
              isLoading: true,
              error: null,
            },
          },
        },
      };

      expect(
        selectors.isDraftOrderFetched(
          mockStateLoading as unknown as StoreState,
          draftOrderId,
        ),
      ).toBe(false);
    });
  });

  describe('isUpdatingDraftOrder', () => {
    it('should return the loading status for a draft order request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.updateDraftOrder[draftOrderId]
          ?.isLoading;

      expect(
        selectors.isUpdatingDraftOrder(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getUpdateDraftOrderError', () => {
    it('should return the error status for a draft order request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.updateDraftOrder[draftOrderId]?.error;

      expect(
        selectors.getUpdateDraftOrderError(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('isRemovingDraftOrder', () => {
    it('should return the loading status for a delete draft order', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.removeDraftOrder[draftOrderId]
          ?.isLoading;

      expect(
        selectors.isRemovingDraftOrder(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getRemoveDraftOrderError', () => {
    it('should return the error status for a draft order request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.removeDraftOrder[draftOrderId]?.error;

      expect(
        selectors.getRemoveDraftOrderError(
          mockDraftOrderState as StoreState,
          draftOrderId,
        ),
      ).toEqual(expectedResult);
    });
  });
});
