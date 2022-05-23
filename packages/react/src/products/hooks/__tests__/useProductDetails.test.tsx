import { fetchProductDetails } from '@farfetch/blackout-redux/products';
import { mockProductId, mockProductsState } from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React from 'react';
import useProductDetails from '../useProductDetails';
import { renderHook } from '@testing-library/react';

jest.mock('@farfetch/blackout-redux/products', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/products'),
  fetchProductDetails: jest.fn(() => ({ type: 'get' })),
}));

const getRenderedHook = (props, state = mockProductsState) => {
  return renderHook(() => useProductDetails(props), {
    wrapper: ({ children }) => (
      <Provider store={mockStore(state)}>{children}</Provider>
    ),
  });
};

describe('useProductDetails', () => {
  beforeEach(jest.clearAllMocks);

  describe('when it has a product id', () => {
    it('should return values correctly with initial state', async () => {
      const { result } = getRenderedHook(mockProductId);

      expect(result.current).toStrictEqual({
        breadcrumbs: expect.any(Array),
        error: expect.any(Object),
        groupedEntries: undefined,
        isDuplicated: expect.any(Boolean),
        isFetched: expect.any(Boolean),
        isHydrated: expect.any(Boolean),
        isInBag: expect.any(Boolean),
        isLoading: expect.any(Boolean),
        isOneSize: expect.any(Boolean),
        isOutOfStock: expect.any(Boolean),
        labelsPrioritized: expect.any(Array),
        product: expect.any(Object),
        promotions: expect.any(Array),
        availableSizes: expect.any(Array),
      });
    });
  });

  describe('when the product has not been fetched', () => {
    it('should fetch the product', () => {
      const storeState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          details: {
            ...mockProductsState.products.details,
            isHydrated: {},
            isLoading: {},
          },
        },
      };

      getRenderedHook(mockProductId, storeState);

      expect(fetchProductDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the product is already fetched', () => {
    it('should not fetch the product', () => {
      getRenderedHook(mockProductId);

      expect(fetchProductDetails).not.toHaveBeenCalled();
    });
  });
});
