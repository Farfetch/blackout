import { cleanup } from '@testing-library/react';
import { getSlug } from '@farfetch/blackout-redux/products/utils';
import {
  mockProductsListPathname,
  mockProductsState,
  mockQuery,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import useProductsList from '../useProductsList';
import type { UseProductsListParams } from '../types';

jest.mock('@farfetch/blackout-redux/products', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/products'),
  fetchListing: jest.fn(() => ({ type: 'fetchListing' })),
  fetchSet: jest.fn(() => ({ type: 'fetchSet' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (
  props: Partial<UseProductsListParams> = {},
  state: unknown = mockProductsState,
) => {
  const {
    result: { current },
  } = renderHook(
    () => {
      return useProductsList({
        slug: getSlug(mockProductsListPathname),
        query: mockQuery,
        ...props,
      } as UseProductsListParams);
    },
    {
      wrapper: props => <Provider store={mockStore(state)} {...props} />,
    },
  );

  return current;
};

describe('useProductsList', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook({});

    expect(current).toStrictEqual({
      error: expect.any(Object),
      isFetched: expect.any(Boolean),
      isLoading: expect.any(Boolean),
      productsListHash: expect.any(String),
      products: expect.any(Array),
      result: expect.any(Object),
    });
  });

  describe('behaviour', () => {
    it('should fetch a listing', () => {
      getRenderedHook(undefined, {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          lists: {
            error: {},
            isHydrated: {},
            isLoading: {},
            hash: undefined,
          },
        },
        entities: {},
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchListing' });
    });

    it('should fetch a set', () => {
      getRenderedHook({ type: 'set' });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchSet' });
    });

    it('should not fetch anything if there is no slug', () => {
      getRenderedHook({ slug: undefined });

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
