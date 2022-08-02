import * as fromBag from '../reducer';
import * as fromEntities from '../../entities/selectors/entity';
import * as selectors from '../selectors';
import {
  mockBagId,
  mockBagItem,
  mockBagItemEntity,
  mockBagItemId,
  mockState,
} from 'tests/__fixtures__/bags';
import {
  mockProduct,
  mockProductId,
  mockProductTypeToExclude,
} from 'tests/__fixtures__/products';
import cloneDeep from 'lodash/cloneDeep';

describe('bags redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('getBagId()', () => {
    it('should get the bag id property from state', () => {
      const spy = jest.spyOn(fromBag, 'getId');

      expect(selectors.getBagId(mockState)).toEqual(mockBagId);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBag()', () => {
    it('should get the user bag from state', () => {
      const spy = jest.spyOn(fromBag, 'getResult');

      expect(selectors.getBag(mockState)).toEqual(mockState.bag.result);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBagError()', () => {
    it('should get the bag error property from state', () => {
      const expectedResult = mockState.bag.error;
      const spy = jest.spyOn(fromBag, 'getError');

      expect(selectors.getBagError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isBagLoading()', () => {
    it('should get the bag loading status from state', () => {
      const expectedResult = mockState.bag.isLoading;
      const spy = jest.spyOn(fromBag, 'getIsLoading');

      expect(selectors.isBagLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isBagFetched()', () => {
    it('should return true if the bag fetch request succeeded', () => {
      expect(selectors.isBagFetched(mockState)).toBe(true);
    });
    it('should return true if the bag fetch request failed', () => {
      const mockStateWithError = {
        ...mockState,
        bag: {
          ...mockState.bag,
          error: new Error(),
          id: undefined,
        },
      };
      expect(selectors.isBagFetched(mockStateWithError)).toBe(true);
    });
    it('should return false if there is an ongoing fetch request', () => {
      const mockStateLoading = {
        ...mockState,
        bag: {
          ...mockState.bag,
          isLoading: true,
        },
      };

      expect(selectors.isBagFetched(mockStateLoading)).toBe(false);
    });
  });

  describe('getBagItem()', () => {
    const expectedResult = {
      ...mockBagItemEntity,
      product: mockProduct,
    };

    it('should return all data regarding a bag item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(selectors.getBagItem(mockState, mockBagItemId)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'bagItems', mockBagItemId);
    });
  });

  describe('getBagItemsIds()', () => {
    it("should return a list of bag item ID's from state", () => {
      const expectedResult = mockState.bag.items.ids;

      expect(selectors.getBagItemsIds(mockState)).toEqual(expectedResult);
    });
  });

  describe('getBagItems()', () => {
    it('should return the bag items content from state', () => {
      const expectedResult = [
        {
          ...mockState.entities.bagItems[mockBagItemId],
          product: mockState.entities.products[mockProductId],
        },
        {
          ...mockState.entities.bagItems[101],
          product: mockState.entities.products[mockProductId],
        },
        {
          ...mockState.entities.bagItems[102],
          product: mockState.entities.products[1002],
        },
        {
          ...mockState.entities.bagItems[103],
          product: mockState.entities.products[mockProductId],
        },
        {
          ...mockState.entities.bagItems[104],
          product: mockState.entities.products[mockProductId],
        },
      ];

      expect(selectors.getBagItems(mockState)).toEqual(expectedResult);
    });

    it('should return an empty array when there are no bag or bag items', () => {
      const mockStateWithoutBagItems = {
        ...mockState,
        bag: {
          error: null,
          id: null,
          isLoading: false,
          result: null,
          items: {
            ids: null,
            item: {
              error: {},
              isLoading: {},
            },
          },
        },
        entities: {
          ...mockState.entities,
          bagItems: {},
        },
      };

      expect(selectors.getBagItems(mockStateWithoutBagItems)).toEqual([]);
    });
  });

  describe('getBagItemsCounter()', () => {
    it('should return the bag items counter when bag items exists', () => {
      const expectedResult = 5;

      expect(selectors.getBagItemsCounter(mockState)).toEqual(expectedResult);
    });

    it('should return the bag items counter excluding a specific product type', () => {
      const expectedResult = 4;
      const excludeProductTypes = [mockProductTypeToExclude];

      expect(
        selectors.getBagItemsCounter(mockState, excludeProductTypes),
      ).toEqual(expectedResult);
    });

    it('should return the bag items counter when bag items exists', () => {
      const expectedResult = 5;

      expect(selectors.getBagItemsCounter(mockState)).toEqual(expectedResult);
    });

    it('should return 0 when bag items does not exists', () => {
      const expectedResult = 0;

      expect(
        selectors.getBagItemsCounter({
          // @ts-expect-error Changing only what's necessary for this test
          bag: { ...mockState.bag, items: { ...mockState.bag.items, ids: [] } },
          entities: {},
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('getBagTotalQuantity()', () => {
    it('should return the bag items total quantity when bag items exists', () => {
      const expectedResult = 65;

      expect(selectors.getBagTotalQuantity(mockState)).toEqual(expectedResult);
    });

    it('should return the bag items total quantity excluding a specific product type', () => {
      const expectedResult = 63;
      const excludeProductTypes = [mockProductTypeToExclude];

      expect(
        selectors.getBagTotalQuantity(mockState, excludeProductTypes),
      ).toEqual(expectedResult);
    });

    it('should return 0 when does not exists bag items', () => {
      const expectedResult = 0;

      expect(
        selectors.getBagTotalQuantity({
          // @ts-expect-error Changing only what's necessary for this test
          bag: { ...mockState.bag, items: { ...mockState.bag.items, ids: [] } },
          entities: { bagItems: {} },
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('isBagItemLoading()', () => {
    it('should get the bag item loading status', () => {
      const spy = jest.spyOn(fromBag, 'getAreItemsLoading');

      expect(selectors.isBagItemLoading(mockState, mockBagItemId)).toEqual(
        true,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBagItemError()', () => {
    it('should get the bag item error', () => {
      const expectedResult = mockState.bag.items.item.error[mockBagItemId];
      const spy = jest.spyOn(fromBag, 'getItemsError');

      expect(selectors.getBagItemError(mockState, mockBagItemId)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBagItemsUnavailable()', () => {
    it('should not return any items if all items are available', () => {
      expect(selectors.getBagItemsUnavailable(mockState)).toEqual([]);
    });

    it('should return an empty array if there is no bag loaded', () => {
      expect(
        selectors.getBagItemsUnavailable({
          // @ts-expect-error Changing only what's necessary for this test
          bag: fromBag.INITIAL_STATE,
          entities: {},
        }),
      ).toEqual([]);
    });

    it('should return an empty array if bag items does not exist', () => {
      expect(
        selectors.getBagItemsUnavailable({
          bag: {
            ...fromBag.INITIAL_STATE,
            items: {
              ...fromBag.INITIAL_STATE.items,
              ids: [],
            },
          },
          entities: {},
        }),
      ).toEqual([]);
    });

    it('should return a list with the unavailable items', () => {
      const state = cloneDeep(mockState);
      state.entities.bagItems[102].isAvailable = false;

      const expectedResult = [
        {
          ...state.entities.bagItems[102],
          product: state.entities.products[1002],
        },
      ];

      expect(selectors.getBagItemsUnavailable(state)).toEqual(expectedResult);
    });
  });

  describe('getBagItemAvailableSizes()', () => {
    it('should return an empty list if there are no sizes', () => {
      const productsWithoutSizes = {
        ...mockProduct,
        sizes: null,
      };
      const newMockState = {
        ...mockState,
        entities: {
          ...mockState.entities,
          products: {
            ...mockState.entities.products,
            [mockProductId]: productsWithoutSizes,
          },
        },
      };

      expect(
        selectors.getBagItemAvailableSizes(newMockState, mockBagItemId),
      ).toEqual([]);
    });

    it('should return a list with available sizes', () => {
      expect(
        selectors.getBagItemAvailableSizes(mockState, mockBagItemId),
      ).toEqual(mockProduct.sizes.filter(size => size.id !== 23));
    });

    it('should return the normal sizes if products are not the same', () => {
      const bagItemId = mockState.entities.bagItems[102].id;
      const productId = mockState.entities.bagItems[bagItemId].product;
      const expectedResult = mockState.entities.products[productId].sizes;

      expect(selectors.getBagItemAvailableSizes(mockState, bagItemId)).toEqual(
        expectedResult,
      );
    });
  });

  describe('findProductInBag()', () => {
    const product = mockProduct;
    const size = mockBagItemEntity.size;

    it('should return the bag item that already exists', () => {
      const expectedResult = {
        ...mockState.entities.bagItems[mockBagItemId],
        product: mockProduct,
      };

      expect(
        selectors.findProductInBag(mockState, {
          product,
          size,
          merchantId: product.merchant,
        }),
      ).toEqual(expectedResult);
    });

    it('should return undefined if the product id does not exists on bagItems', () => {
      const state = {
        bag: {
          ...mockState.bag,
          items: {
            ...mockState.bag.items,
            ids: [],
          },
        },
        entities: {
          bagItems: undefined,
          products: undefined,
        },
      };

      expect(
        selectors.findProductInBag(state, {
          product,
          size,
          merchantId: product.merchant,
        }),
      ).toBeUndefined();
    });
  });

  describe('isBagWithAnyError()', () => {
    it('should return a true if there is a general bag error', () => {
      const mockStateWithGeneralError = {
        ...mockState,
        bag: {
          error: 'error: not loaded',
          id: mockBagId,
          isLoading: false,
          items: {
            isLoading: {
              [mockBagItemId]: true,
            },
            error: {
              [mockBagItemId]: null,
            },
          },
        },
      };

      expect(selectors.isBagWithAnyError(mockStateWithGeneralError)).toEqual(
        true,
      );
    });

    it('should return a true if there is an error in a bag item', () => {
      const mockStatewithBagItemError = {
        ...mockState,
        bag: {
          error: null,
          id: mockBagId,
          isLoading: false,
          items: {
            ids: [mockBagItemId],
            item: {
              isLoading: {
                [mockBagItemId]: true,
              },
              error: {
                [mockBagItemId]: 'Oh no! Terrible error!',
              },
            },
          },
        },
      };

      expect(selectors.isBagWithAnyError(mockStatewithBagItemError)).toEqual(
        true,
      );
    });

    it('should return false if there are no errors', () => {
      const mockStateWithoutError = {
        ...mockState,
        bag: {
          error: null,
          id: mockBagId,
          isLoading: false,
          items: {
            isLoading: {
              [mockBagItemId]: true,
            },
            error: {
              [mockBagItemId]: null,
            },
          },
        },
      };
      expect(selectors.isBagWithAnyError(mockStateWithoutError)).toEqual(false);
    });

    it('should return false if the bag items are an empty array', () => {
      const mockStateWithoutBagItems = {
        ...mockState,
        bag: {
          error: null,
          id: mockBagId,
          isLoading: false,
          items: {
            isLoading: {},
            error: {},
          },
        },
      };
      expect(selectors.isBagWithAnyError(mockStateWithoutBagItems)).toEqual(
        false,
      );
    });

    it('should return false if does not exist bag items', () => {
      const mockStateWithoutBagItems = {
        ...mockState,
        entities: {
          bag: { [mockBagId]: { id: mockBagId } },
        },
        bag: {
          error: null,
          id: mockBagId,
          isLoading: false,
          items: {
            isLoading: {},
            error: {},
          },
        },
      };
      expect(selectors.isBagWithAnyError(mockStateWithoutBagItems)).toEqual(
        false,
      );
    });
  });

  describe('getProductQuantityInBag()', () => {
    it('should get the quantity of all bag items who share the same product and size', () => {
      const expectedResult = 15;

      expect(
        selectors.getProductQuantityInBag(
          mockState,
          mockProductId,
          mockBagItem.sizeId,
        ),
      ).toBe(expectedResult);
    });
  });

  describe('isProductInBag()', () => {
    it('should return true if there is a product with the same product id', () => {
      expect(selectors.isProductInBag(mockState, mockProductId)).toBe(true);
    });

    it('should return false if found nothing', () => {
      expect(
        selectors.isProductInBag(
          {
            bag: {
              ...mockState.bag,
              items: {
                ...mockState.bag.items,
                ids: [],
              },
            },
            entities: {},
          },
          mockProductId,
        ),
      ).toBe(false);
    });
  });
});
