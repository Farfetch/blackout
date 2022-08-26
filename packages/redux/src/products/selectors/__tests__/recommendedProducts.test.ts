import * as recommendedProductsReducer from '../../reducer/recommendedProducts';
import * as selectors from '../recommendedProducts';
import {
  mockProductsState,
  mockRecommendedProductsStrategy,
} from 'tests/__fixtures__/products';
import merge from 'lodash/merge';
import type { StoreState } from '../../../types';

const mockStore: StoreState = merge({} as StoreState, mockProductsState);

describe('Recommended Products redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('areRecommendedProductsLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(
        recommendedProductsReducer,
        'getAreRecommendedProductsLoading',
      );

      expect(
        selectors.areRecommendedProductsLoading(
          merge(mockStore, {
            products: {
              recommendedProducts: {
                isLoading: {
                  [mockRecommendedProductsStrategy]: false,
                },
              },
            },
          }),
          mockRecommendedProductsStrategy,
        ),
      ).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecommendedProductsErrors()', () => {
    it('should get the error status', () => {
      const spy = jest.spyOn(
        recommendedProductsReducer,
        'getRecommendedProductsErrors',
      );

      expect(
        selectors.getRecommendedProductsError(
          mockStore,
          mockRecommendedProductsStrategy,
        ),
      ).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecommendedProduct()', () => {
    it('should get the result', () => {
      const spy = jest.spyOn(
        recommendedProductsReducer,
        'getRecommendedProductsResult',
      );

      expect(selectors.getRecommendedProducts(mockStore)).toEqual(
        mockProductsState.products.recommendedProducts.result,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecommendedProductsByStrategyName()', () => {
    it('should get the result by strategy name', () => {
      const spy = jest.spyOn(
        recommendedProductsReducer,
        'getRecommendedProductsResult',
      );

      expect(
        selectors.getRecommendedProductsByStrategyName(
          mockStore,
          mockRecommendedProductsStrategy,
        ),
      ).toEqual(
        mockProductsState.products.recommendedProducts.result[
          mockRecommendedProductsStrategy
        ],
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRecommendedProductsId()', () => {
    it('should get the id of the strategy', () => {
      const spy = jest.spyOn(
        recommendedProductsReducer,
        'getRecommendedProductsResult',
      );

      expect(
        selectors.getRecommendedProductsId(
          mockStore,
          mockRecommendedProductsStrategy,
        ),
      ).toEqual(
        mockProductsState.products.recommendedProducts.result[
          mockRecommendedProductsStrategy
        ].id,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
