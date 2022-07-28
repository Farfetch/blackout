import { cleanup, renderHook } from '@testing-library/react';
import { mockBagItem, mockBagItemId, mockState } from 'tests/__fixtures__/bags';
import {
  mockMerchantId,
  mockProductId,
  mockSizeScaleId,
} from 'tests/__fixtures__/products/ids.fixtures';
import { removeBagItem, updateBagItem } from '@farfetch/blackout-redux';
import { useBagItem } from '../..';
import { withStore } from '../../../../tests/helpers';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  updateBagItem: jest.fn(() => () => Promise.resolve()),
  removeBagItem: jest.fn(() => () => Promise.resolve()),
}));

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
      data: mockBagItem,
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
              error: { [mockBagItemId]: true },
            },
          },
        },
      }),
    });

    expect(error).toBe(true);
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

      await remove();

      expect(removeBagItem).toHaveBeenCalledWith(mockBagItemId);
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

      await update({ sizeId: 2, quantity: 2 }, metadata);

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(
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
        },
        undefined,
        metadata,
      );
    });
  });
});
