import {
  addBagItem,
  fetchBag,
  removeBagItem,
  resetBag,
  updateBagItem,
} from '@farfetch/blackout-redux';
import { cleanup, renderHook } from '@testing-library/react';
import { mockBagId, mockBagItemId, mockState } from 'tests/__fixtures__/bags';
import {
  mockMerchantId,
  mockProductId,
  mockSizeScaleId,
} from 'tests/__fixtures__/products/ids.fixtures';
import { withStore } from '../../../../tests/helpers';
import useBag from '../useBag';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addBagItem: jest.fn(() => () => Promise.resolve()),
  updateBagItem: jest.fn(() => () => Promise.resolve()),
  removeBagItem: jest.fn(() => () => Promise.resolve()),
  fetchBag: jest.fn(() => () => Promise.resolve()),
  resetBag: jest.fn(() => () => Promise.resolve()),
}));

describe('useBag', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useBag(), {
      wrapper: withStore(mockState),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        bagSummary: {
          currency: 'USD',
          currencySymbol: '$',
          dateCreated: '/Date(1534759345364)/',
          dateUpdated: '/Date(1562573175001)/',
          formattedGrandTotal: '$381.62',
          formattedSubTotalAmount: '$371.62',
          formattedSubTotalAmountExclTaxes: '$371.62',
          formattedTotalDiscount: '$0',
          formattedTotalShippingFee: '$10',
          formattedTotalTaxes: '$0',
          grandTotal: 381.62,
          subTotalAmount: 371.62,
          subTotalAmountExclTaxes: 371.62,
          taxType: 'DDP',
          totalDiscount: 0,
          totalShippingFee: 10,
          totalTaxes: 0,
        },
        count: 7,
        isEmpty: false,
        items: [
          {
            ...mockState.entities?.bagItems?.[mockBagItemId],
            product:
              mockState.entities?.products?.[
                mockState.entities?.bagItems?.[mockBagItemId]?.product
              ],
          },
          {
            ...mockState.entities?.bagItems?.[101],
            product: mockState.entities?.products?.[11766695],
          },
          {
            ...mockState.entities?.bagItems?.[102],
            product: mockState.entities?.products?.[1002],
          },
          {
            ...mockState.entities?.bagItems?.[103],
            product: mockState.entities?.products?.[11766695],
          },
          {
            ...mockState.entities?.bagItems?.[104],
            product: mockState.entities?.products?.[11766695],
          },
        ],
        id: mockBagId,
      },
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
        addItem: expect.any(Function),
        updateItem: expect.any(Function),
        removeItem: expect.any(Function),
      },
    });
  });

  it('should render as empty', () => {
    const {
      result: {
        current: {
          isFetched,
          data: { isEmpty },
        },
      },
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          result: {
            ...mockState.bag.result,
            count: 0,
            items: [],
          },
          items: {
            ...mockState.bag.items,
            ids: [],
          },
        },
      }),
    });

    expect(isEmpty).toBe(true);
    expect(isFetched).toBe(true);
  });

  it('should render in loading state', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          isLoading: true,
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
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          error: true,
        },
      }),
    });

    expect(error).toBe(true);
  });

  it("should not render in loading state while it doesn't begin fetching", () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          error: undefined,
          result: {},
        },
      }),
    });

    expect(isLoading).toBe(false);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
      renderHook(() => useBag({ enableAutoFetch: true }), {
        wrapper: withStore(mockState),
      });

      expect(fetchBag).toHaveBeenCalledWith(mockBagId, undefined, undefined);
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
      renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      expect(fetchBag).not.toHaveBeenCalledWith('123', undefined, undefined);
    });
  });

  describe('actions', () => {
    it('should call `addBagItem` action', async () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await addItem(mockProductId, { quantity: 1, sizeId: 1 });

      expect(addBagItem).toHaveBeenCalledWith({
        authCode: undefined,
        customAttributes: '',
        merchantId: mockMerchantId,
        productAggregatorId: undefined,
        productId: mockProductId,
        quantity: 1,
        scale: mockSizeScaleId,
        size: 1,
      });
    });

    it('should call `removeBagItem` action', async () => {
      const {
        result: {
          current: {
            actions: { removeItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await removeItem(mockBagItemId);

      expect(removeBagItem).toHaveBeenCalledWith(mockBagItemId);
    });

    it('should call `updateBagItem` action on quantity decrement', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await updateItem(mockBagItemId, { quantity: 1 });

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(mockBagItemId, {
        merchantId: mockMerchantId,
        productId: mockProductId,
        quantity: 1,
        scale: mockSizeScaleId,
        size: 23,
      });
    });

    it('should call `updateBagItem` action on quantity increment', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await updateItem(mockBagItemId, { quantity: 6 });

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(mockBagItemId, {
        authCode: undefined,
        customAttributes: '',
        productAggregatorId: undefined,
        merchantId: mockMerchantId,
        productId: mockProductId,
        quantity: 6,
        scale: mockSizeScaleId,
        size: 23,
        oldQuantity: 5,
        oldSize: 23,
      });
    });

    it('should call `updateBagItem` actions on size update', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await updateItem(mockBagItemId, { sizeId: 4 });

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(addBagItem).not.toHaveBeenCalled();
      expect(updateBagItem).toHaveBeenCalledWith(mockBagItemId, {
        merchantId: mockMerchantId,
        productId: mockProductId,
        quantity: 5,
        scale: mockSizeScaleId,
        size: 4,
        oldSize: 23,
      });
    });

    it('should call `updateBagItem` and `addBagItem` actions on size update if new size needs to be fulfilled by multiple merchants', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await updateItem(mockBagItemId, { sizeId: 2 });

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(addBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(mockBagItemId, {
        merchantId: mockMerchantId,
        productId: mockProductId,
        quantity: 2,
        scale: mockSizeScaleId,
        size: 2,
      });
      expect(addBagItem).toHaveBeenCalledWith({
        authCode: undefined,
        customAttributes: '',
        merchantId: 545,
        productAggregatorId: undefined,
        productId: mockProductId,
        quantity: 3,
        scale: mockSizeScaleId,
        size: 2,
      });
    });

    it('should call `updateBagItem` action if `addItem` is called with a product already on bag', async () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await addItem(mockProductId, { sizeId: 23, quantity: 1 });

      expect(addBagItem).not.toHaveBeenCalled();
      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(mockBagItemId, {
        authCode: undefined,
        customAttributes: '',
        merchantId: mockMerchantId,
        productId: mockProductId,
        quantity: 6,
        scale: mockSizeScaleId,
        size: 23,
        oldQuantity: 5,
        oldSize: 23,
        productAggregatorId: undefined,
      });
    });

    it('should call `removeBagItem` and `addBagItem` actions on update to a size with different merchant', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await updateItem(mockBagItemId, { sizeId: 2 });

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(mockBagItemId, {
        merchantId: mockMerchantId,
        productId: mockProductId,
        quantity: 2,
        scale: mockSizeScaleId,
        size: 2,
      });
    });

    it('should call `updateBagItem` action on size and quantity update', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await updateItem(mockBagItemId, { sizeId: 2, quantity: 2 });

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(mockBagItemId, {
        authCode: undefined,
        customAttributes: '',
        productAggregatorId: undefined,
        merchantId: mockMerchantId,
        productId: mockProductId,
        quantity: 2,
        scale: mockSizeScaleId,
        size: 2,
      });
    });

    it('should update quantity and then add when current merchant has less stock than new quantity', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      await updateItem(mockBagItemId, { sizeId: 24 });

      expect(removeBagItem).toHaveBeenCalledTimes(1);
      expect(addBagItem).toHaveBeenCalledTimes(1);
      expect(removeBagItem).toHaveBeenCalledWith(mockBagItemId);
      expect(addBagItem).toHaveBeenCalledWith({
        authCode: undefined,
        customAttributes: '',
        merchantId: 22,
        productAggregatorId: undefined,
        productId: mockProductId,
        quantity: 5,
        scale: mockSizeScaleId,
        size: 24,
      });
    });

    it('should call `resetBag` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      reset();

      expect(resetBag).toHaveBeenCalled();
    });

    it('should throw an error on calling `addBagItem` action with invalid product id', async () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      expect(() => addItem(999, { quantity: 1, sizeId: 1 })).toThrow(
        'The product data is not fetched.',
      );
    });

    it('should throw an error calling `addBagItem` action with invalid size id', async () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      expect(() => addItem(mockProductId, { quantity: 1, sizeId: 99 })).toThrow(
        'Invalid size id',
      );
    });
  });
});
