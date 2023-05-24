import { cleanup, renderHook } from '@testing-library/react';
import {
  mockBagItemHydrated,
  mockBagItemId,
  mockState,
} from 'tests/__fixtures__/bags/index.mjs';
import {
  mockMerchantId,
  mockProductId,
  mockSizeScaleId,
} from 'tests/__fixtures__/products/ids.fixtures.mjs';
import { removeBagItem, updateBagItem } from '@farfetch/blackout-redux';
import { toBlackoutError } from '@farfetch/blackout-client';
import { useBagItem } from '../../index.js';
import { withStore } from '../../../../tests/helpers/index.js';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  updateBagItem: jest.fn(() => () => Promise.resolve()),
  removeBagItem: jest.fn(() => () => Promise.resolve()),
}));

const myConfig = { headers: { Accept: 'application/vnd.mason+json' } };

describe('useBagItem', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useBagItem(mockBagItemId), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          items: {
            ...mockState.bag.items,
            item: {
              isLoading: {
                [mockBagItemId]: false,
              },
              error: { [mockBagItemId]: null },
            },
          },
        },
      }),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: mockBagItemHydrated,
      actions: {
        update: expect.any(Function),
        remove: expect.any(Function),
      },
    });
  });

  it('should render in loading state', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useBagItem(mockBagItemId), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          items: {
            ...mockState.bag.items,
            item: {
              isLoading: {
                [mockBagItemId]: true,
              },
              error: { [mockBagItemId]: null },
            },
          },
        },
      }),
    });

    expect(isLoading).toBe(true);
  });

  it('should render in error state', () => {
    const mockError = toBlackoutError(new Error('error'));

    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useBagItem(mockBagItemId), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          items: {
            ...mockState.bag.items,
            item: {
              isLoading: {
                [mockBagItemId]: false,
              },
              error: { [mockBagItemId]: mockError },
            },
          },
        },
      }),
    });

    expect(error).toEqual(mockError);
  });

  describe('actions', () => {
    it('should call `remove` action', async () => {
      const {
        result: {
          current: {
            actions: { remove },
          },
        },
      } = renderHook(() => useBagItem(mockBagItemId), {
        wrapper: withStore(mockState),
      });

      await remove(undefined, myConfig);

      expect(removeBagItem).toHaveBeenCalledWith(
        mockState.entities.user.bagId,
        mockBagItemId,
        undefined,
        undefined,
        myConfig,
      );
    });

    it('should call `updateBagItem` action on size and quantity update', async () => {
      const {
        result: {
          current: {
            actions: { update },
          },
        },
      } = renderHook(() => useBagItem(mockBagItemId), {
        wrapper: withStore(mockState),
      });

      const metadata = { from: 'bag' };

      await update({ sizeId: 2, quantity: 2 }, metadata, myConfig);

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(
        mockState.entities.user.bagId,
        mockBagItemId,
        {
          authCode: undefined,
          customAttributes: '',
          productAggregatorId: undefined,
          merchantId: mockMerchantId,
          productId: mockProductId,
          quantity: 2,
          scale: mockSizeScaleId,
          size: 2,
          metadata,
        },
        undefined,
        metadata,
        myConfig,
      );
    });
  });
});
