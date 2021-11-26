import * as fromRecentlyViewed from '../reducer';
import * as selectors from '../selectors';
import {
  expectedLocalPayload,
  expectedRemotePayload,
} from 'tests/__fixtures__/recentlyViewed/getRecentlyViewed';
import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';

describe('RecentlyViewed redux selectors', () => {
  const mockState = {
    recentlyViewed: {
      isLoading: false,
      error: null,
      result: {
        remote: expectedRemotePayload,
        computed: uniqBy(
          [...expectedLocalPayload, ...expectedRemotePayload.entries],
          'productId',
        ),
        pagination: omit(expectedRemotePayload, 'entries'),
      },
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('areRecentlyViewedProductsLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromRecentlyViewed, 'getIsLoading');

      expect(selectors.areRecentlyViewedProductsLoading(mockState)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecentlyViewedProductsError()', () => {
    it('should get the error status', () => {
      const spy = jest.spyOn(fromRecentlyViewed, 'getError');

      expect(selectors.getRecentlyViewedProductsError(mockState)).toBe(null);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecentlyViewedProducts()', () => {
    it('should get the result', () => {
      const spy = jest.spyOn(fromRecentlyViewed, 'getResult');

      expect(selectors.getRecentlyViewedProducts(mockState)).toEqual([
        ...expectedLocalPayload,
        // mimic the lodash `uniqBy` method effect for the given payload
        ...expectedRemotePayload.entries.filter(
          item => item.productId !== expectedLocalPayload[0].productId,
        ),
      ]);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return null when the passed the initialState', () => {
      expect(
        selectors.getRecentlyViewedProducts({
          recentlyViewed: {
            result: {
              remote: null,
              computed: null,
            },
          },
        }),
      ).toEqual(null);
    });
  });

  describe('areRecentlyViewedProductsFetched()', () => {
    it('should return false if the remote entry is null', () => {
      const spy = jest.spyOn(fromRecentlyViewed, 'getResult');
      const initialState = {
        recentlyViewed: {
          result: {
            remote: null,
          },
        },
      };

      expect(selectors.areRecentlyViewedProductsFetched(initialState)).toEqual(
        false,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return true if the remote entry is filled', () => {
      const spy = jest.spyOn(fromRecentlyViewed, 'getResult');

      expect(selectors.areRecentlyViewedProductsFetched(mockState)).toEqual(
        true,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecentlyViewedProductsPagination()', () => {
    it('should get the pagination result', () => {
      const spy = jest.spyOn(fromRecentlyViewed, 'getResult');

      expect(selectors.getRecentlyViewedProductsPagination(mockState)).toBe(
        mockState.recentlyViewed.result.pagination,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
