import * as recentlyViewedReducer from '../../reducer/recentlyViewedProducts';
import * as selectors from '../recentlyViewedProducts';
import {
  expectedRecentlyViewedLocalPayload,
  expectedRecentlyViewedRemotePayload,
} from 'tests/__fixtures__/products';
import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';
import type { StoreState } from '../../../types';

describe('RecentlyViewed redux selectors', () => {
  const mockState: StoreState = {
    products: {
      recentlyViewed: {
        isLoading: false,
        error: null,
        result: {
          remote: expectedRecentlyViewedRemotePayload,
          computed: uniqBy(
            [
              ...expectedRecentlyViewedLocalPayload,
              ...expectedRecentlyViewedRemotePayload.entries,
            ],
            'productId',
          ),
          pagination: omit(expectedRecentlyViewedRemotePayload, 'entries'),
        },
      },
    },
  } as StoreState;

  beforeEach(jest.clearAllMocks);

  describe('areRecentlyViewedProductsLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(recentlyViewedReducer, 'getIsLoading');

      expect(selectors.areRecentlyViewedProductsLoading(mockState)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecentlyViewedProductsError()', () => {
    it('should get the error status', () => {
      const spy = jest.spyOn(recentlyViewedReducer, 'getError');

      expect(selectors.getRecentlyViewedProductsError(mockState)).toBeNull();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecentlyViewedProducts()', () => {
    it('should get the result', () => {
      const spy = jest.spyOn(recentlyViewedReducer, 'getResult');

      expect(selectors.getRecentlyViewedProducts(mockState)).toEqual([
        ...expectedRecentlyViewedLocalPayload,
        // mimic the lodash `uniqBy` method effect for the given payload
        ...expectedRecentlyViewedRemotePayload.entries.filter(
          item =>
            item.productId !==
            expectedRecentlyViewedLocalPayload?.[0]?.productId,
        ),
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return null when the passed the initialState', () => {
      expect(
        selectors.getRecentlyViewedProducts({
          products: {
            recentlyViewed: {
              result: {
                remote: null,
                computed: null,
                pagination: null,
              },
              isLoading: false,
              error: null,
            },
          },
        } as StoreState),
      ).toBeNull();
    });
  });

  describe('areRecentlyViewedProductsFetched()', () => {
    it('should return false if the remote entry is null', () => {
      const spy = jest.spyOn(recentlyViewedReducer, 'getResult');
      const initialState: StoreState = {
        products: {
          recentlyViewed: {
            result: {
              remote: null,
              pagination: undefined,
              computed: undefined,
            },
            isLoading: false,
            error: null,
          },
        },
      } as StoreState;

      expect(selectors.areRecentlyViewedProductsFetched(initialState)).toBe(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return true if the remote entry is filled', () => {
      const spy = jest.spyOn(recentlyViewedReducer, 'getResult');

      expect(selectors.areRecentlyViewedProductsFetched(mockState)).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecentlyViewedProductsPagination()', () => {
    it('should get the pagination result', () => {
      const spy = jest.spyOn(recentlyViewedReducer, 'getResult');

      expect(selectors.getRecentlyViewedProductsPagination(mockState)).toBe(
        mockState?.products?.recentlyViewed?.result?.pagination,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
