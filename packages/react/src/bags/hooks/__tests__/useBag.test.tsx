import {
  addBagItem,
  type BagNormalized,
  fetchBag,
  removeBagItem,
  resetBag,
  updateBagItem,
} from '@farfetch/blackout-redux';
import { AddUpdateItemBagError, BagItemNotFoundError } from '../errors';
import { type BlackoutError, toBlackoutError } from '@farfetch/blackout-client';
import { cleanup, renderHook } from '@testing-library/react';
import {
  mockBagId,
  mockBagItemId,
  mockState,
  mockStateWithSizeWithoutStock,
  mockStateWithUnavailableStock,
} from 'tests/__fixtures__/bags';
import {
  mockBrandId,
  mockMerchantId,
  mockProductId,
  mockSizeScaleId,
} from 'tests/__fixtures__/products/ids.fixtures';
import { mockCategoryId } from 'tests/__fixtures__/categories';
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

const metadata = { from: 'plp' };

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
          totalProductPromotionDiscount: 0,
          formattedTotalProductPromotionDiscount: '$0',
        },
        count: 7,
        isEmpty: false,
        items: [
          {
            ...mockState.entities?.bagItems?.[mockBagItemId],
            product: {
              ...mockState.entities!.products![
                mockState.entities!.bagItems![mockBagItemId]!
                  .product as keyof typeof mockState.entities.products
              ],
              brand: mockState.entities!.brands![mockBrandId],
              categories: [mockState.entities.categories[mockCategoryId]],
            },
          },
          {
            ...mockState.entities?.bagItems?.[101],
            product: {
              ...mockState.entities?.products?.[11766695],
              brand: mockState.entities?.brands?.[mockBrandId],
              categories: [mockState.entities.categories[mockCategoryId]],
            },
          },
          {
            ...mockState.entities?.bagItems?.[102],
            product: {
              ...mockState.entities?.products?.[1002],
              brand: mockState.entities?.brands?.[mockBrandId],
              categories: [mockState.entities.categories[mockCategoryId]],
            },
          },
          {
            ...mockState.entities?.bagItems?.[103],
            product: {
              ...mockState.entities?.products?.[11766695],
              brand: mockState.entities?.brands?.[mockBrandId],
              categories: [mockState.entities.categories[mockCategoryId]],
            },
          },
          {
            ...mockState.entities?.bagItems?.[104],
            product: {
              ...mockState.entities?.products?.[11766695],
              brand: mockState.entities?.brands?.[mockBrandId],
              categories: [mockState.entities.categories[mockCategoryId]],
            },
          },
        ],
        hadUnavailableItems: false,
        id: mockBagId,
        '@controls': mockState.bag.result['@controls'],
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
        current: { isFetched, data },
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

    const isEmpty = data?.isEmpty;

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
    const mockError = toBlackoutError(new Error('error'));
    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useBag(), {
      wrapper: withStore({
        ...mockState,
        bag: {
          ...mockState.bag,
          error: mockError,
        },
      }),
    });

    expect(error).toBe(mockError);
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
          error: null,
          result: {} as BagNormalized,
        },
      }),
    });

    expect(isLoading).toBe(false);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      renderHook(() => useBag({ enableAutoFetch: true }), {
        wrapper: withStore(mockState),
      });

      expect(fetchBag).toHaveBeenCalledWith(mockBagId, undefined, undefined);
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
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

      await addItem(mockProductId, { quantity: 1, sizeId: 1 }, metadata);

      expect(addBagItem).toHaveBeenCalledWith(
        {
          authCode: undefined,
          customAttributes: '',
          merchantId: mockMerchantId,
          productAggregatorId: undefined,
          productId: mockProductId,
          quantity: 1,
          scale: mockSizeScaleId,
          size: 1,
        },
        undefined,
        metadata,
      );
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

      await updateItem(mockBagItemId, { quantity: 1 }, metadata);

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(
        mockBagItemId,
        {
          merchantId: mockMerchantId,
          productId: mockProductId,
          quantity: 1,
          scale: mockSizeScaleId,
          size: 23,
        },
        undefined,
        metadata,
      );
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

      await updateItem(mockBagItemId, { quantity: 6 }, metadata);

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(
        mockBagItemId,
        {
          authCode: undefined,
          customAttributes: '',
          productAggregatorId: undefined,
          merchantId: mockMerchantId,
          productId: mockProductId,
          quantity: 6,
          scale: mockSizeScaleId,
          size: 23,
        },
        undefined,
        metadata,
      );
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

      await updateItem(mockBagItemId, { sizeId: 4 }, metadata);

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(addBagItem).not.toHaveBeenCalled();
      expect(updateBagItem).toHaveBeenCalledWith(
        mockBagItemId,
        {
          merchantId: mockMerchantId,
          productId: mockProductId,
          quantity: 5,
          scale: mockSizeScaleId,
          size: 4,
        },
        undefined,
        metadata,
      );
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

      await updateItem(mockBagItemId, { sizeId: 2 }, metadata);

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(addBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(
        mockBagItemId,
        {
          merchantId: mockMerchantId,
          productId: mockProductId,
          quantity: 2,
          scale: mockSizeScaleId,
          size: 2,
        },
        undefined,
        metadata,
      );
      expect(addBagItem).toHaveBeenCalledWith(
        {
          authCode: undefined,
          customAttributes: '',
          merchantId: 545,
          productAggregatorId: undefined,
          productId: mockProductId,
          quantity: 3,
          scale: mockSizeScaleId,
          size: 2,
        },
        undefined,
        metadata,
      );
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

      await addItem(mockProductId, { sizeId: 23, quantity: 1 }, metadata);

      expect(addBagItem).not.toHaveBeenCalled();
      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(
        mockBagItemId,
        {
          authCode: undefined,
          customAttributes: '',
          merchantId: mockMerchantId,
          productId: mockProductId,
          quantity: 6,
          scale: mockSizeScaleId,
          size: 23,
          productAggregatorId: undefined,
        },
        undefined,
        metadata,
      );
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

      await updateItem(mockBagItemId, { sizeId: 2 }, metadata);

      expect(updateBagItem).toHaveBeenCalledTimes(1);
      expect(updateBagItem).toHaveBeenCalledWith(
        mockBagItemId,
        {
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

      await updateItem(mockBagItemId, { sizeId: 2, quantity: 2 }, metadata);

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

      await updateItem(mockBagItemId, { sizeId: 24 }, metadata);

      expect(removeBagItem).toHaveBeenCalledTimes(1);
      expect(addBagItem).toHaveBeenCalledTimes(1);
      expect(removeBagItem).toHaveBeenCalledWith(
        mockBagItemId,
        undefined,
        metadata,
      );
      expect(addBagItem).toHaveBeenCalledWith(
        {
          authCode: undefined,
          customAttributes: '',
          merchantId: 22,
          productAggregatorId: undefined,
          productId: mockProductId,
          quantity: 5,
          scale: mockSizeScaleId,
          size: 24,
        },
        undefined,
        metadata,
      );
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

    it('should throw an error when calling `addItem` action with invalid product id', () => {
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

    it('should throw an error when calling `addItem` action with invalid size id', () => {
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

    it('should throw an error when calling `addItem` action for a size that does not contain stock property', async () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useBag(), {
        // @ts-expect-error State contains a product entity whose sizes property contain a size without stock property.
        wrapper: withStore(mockStateWithSizeWithoutStock),
      });

      let error = toBlackoutError({});

      try {
        await addItem(mockProductId, { quantity: 1, sizeId: 1 });
      } catch (e) {
        error = e as BlackoutError;
      }

      expect(error.code).toBe(-1);
      expect(error).toEqual(new AddUpdateItemBagError(-1));
    });

    it('should throw an error when calling `addItem` action if it was unable to add or update the item quantity in bag', async () => {
      const {
        result: {
          current: {
            actions: { addItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockStateWithUnavailableStock),
      });

      let error = toBlackoutError({});

      try {
        await addItem(mockProductId, { quantity: 1, sizeId: 23 });
      } catch (e) {
        error = e as BlackoutError;
      }

      expect(error.code).toBe(3);
      expect(error).toEqual(new AddUpdateItemBagError(3));
    });

    it('should throw an error when calling `updateItem` for a bag item id that does not exist in the bag', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockState),
      });

      let error = toBlackoutError({});

      try {
        await updateItem(
          mockBagItemId + 10000,
          { sizeId: 2, quantity: 2 },
          metadata,
        );
      } catch (e) {
        error = e as BlackoutError;
      }

      expect(error.code).toBe(1);
      expect(error).toEqual(new BagItemNotFoundError());
    });

    it('should throw an error when calling `updateItem` if it was unable to add or update the item quantity in bag', async () => {
      const {
        result: {
          current: {
            actions: { updateItem },
          },
        },
      } = renderHook(() => useBag(), {
        wrapper: withStore(mockStateWithUnavailableStock),
      });

      let error = toBlackoutError({});

      try {
        await updateItem(mockBagItemId, { sizeId: 23, quantity: 20 }, metadata);
      } catch (e) {
        error = e as BlackoutError;
      }

      expect(error.code).toBe(3);
      expect(error).toEqual(new AddUpdateItemBagError(3));
    });
  });
});
