import * as fromEntities from '../../../entities/selectors/entity.js';
import * as selectors from '../selectors.js';
import {
  customerId,
  draftOrderId,
  mockDraftOrderState,
  mockFetchDraftOrdersNormalizedPayload,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { checkoutId as orderId } from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import type { DraftOrdersQuery } from '@farfetch/blackout-client';
import type { StoreState } from '../../../types/index.js';

describe('draftOrders redux selectors', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('isDraftOrderCreationsLoading', () => {
    it('should return the loading status for a draft order creation request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.draftOrderCreations[orderId]
          ?.isLoading;

      expect(
        selectors.isDraftOrderCreationsLoading(
          mockDraftOrderState as StoreState,
          orderId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getDraftOrderCreationsError', () => {
    it('should return the error status for a draft order creation request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.draftOrderCreations[orderId]?.error;

      expect(
        selectors.getDraftOrderCreationsError(
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

      expect(
        selectors.getDraftOrders(mockDraftOrderState as StoreState),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(mockDraftOrderState, 'draftOrders');
    });

    it('should return an empty object when draft orders is undefined', () => {
      const spy = jest.spyOn(fromEntities, 'getEntities');
      const state = { entities: {} } as StoreState;

      expect(selectors.getDraftOrders(state)).toEqual([]);
      expect(spy).toHaveBeenCalledWith(state, 'draftOrders');
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
      const hash = `?customerid=${customerId}`;
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

  describe('getDraftOrderssError', () => {
    it('should return the error status for the draft order request', () => {
      const hash = `?customerid=${customerId}`;
      const expectedResult =
        mockDraftOrderState.draftOrders?.allDraftOrders[hash]?.error;
      const query = { customerId };

      expect(
        selectors.getDraftOrderssError(
          mockDraftOrderState as StoreState,
          query as DraftOrdersQuery,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('isDraftOrderLoading', () => {
    it('should return the loading status for a draft order request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.draftOrder[draftOrderId]?.isLoading;

      expect(
        selectors.isDraftOrderLoading(
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

  describe('isUpdateDraftOrderLoading', () => {
    it('should return the loading status for a draft order request', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.updateDraftOrder[draftOrderId]
          ?.isLoading;

      expect(
        selectors.isUpdateDraftOrderLoading(
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

  describe('isRemoveDraftOrderLoading', () => {
    it('should return the loading status for a delete draft order', () => {
      const expectedResult =
        mockDraftOrderState.draftOrders?.removeDraftOrder[draftOrderId]
          ?.isLoading;

      expect(
        selectors.isRemoveDraftOrderLoading(
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
