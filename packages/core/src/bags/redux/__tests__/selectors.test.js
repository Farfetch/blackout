import * as fromBag from '../reducer';
import * as fromEntities from '../../../entities/redux/selectors/entity';
import * as selectors from '../selectors';
import {
  mockBagEntity,
  mockBagId,
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
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getBag(mockState)).toEqual(mockBagEntity);
      expect(spy).toHaveBeenCalledWith(mockState, 'bag', mockBagId);
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

  describe('getBagItem()', () => {
    const expectedResult = {
      ...mockBagItemEntity,
      product: mockProduct,
    };

    it('should return all data regarding a bag item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntity');

      expect(selectors.getBagItem(mockState, mockBagItemId)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledWith(mockState, 'bagItems', mockBagItemId);
    });
  });

  describe('getBagItemsIds()', () => {
    it("should return a list of bag item ID's from state", () => {
      const expectedResult = mockBagEntity.items;

      expect(selectors.getBagItemsIds(mockState)).toEqual(expectedResult);
    });

    it('should return undefined', () => {
      const state = {
        ...mockState,
        entities: { bag: { id: mockBagId } },
      };

      expect(selectors.getBagItemsIds(state)).toBeUndefined();
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
  });

  describe('getBagItemsCounter()', () => {
    it('should return the bagItems counter when bagItems exists', () => {
      const expectedResult = 5;

      expect(selectors.getBagItemsCounter(mockState)).toEqual(expectedResult);
    });

    it('should return the bagItems counter excluding a specific product type', () => {
      const expectedResult = 4;
      const excludeProductTypes = [mockProductTypeToExclude];

      expect(
        selectors.getBagItemsCounter(mockState, excludeProductTypes),
      ).toEqual(expectedResult);
    });

    it('should return the bagItems counter when bagItems exists', () => {
      const expectedResult = 5;

      expect(selectors.getBagItemsCounter(mockState)).toEqual(expectedResult);
    });

    it('should return 0 when does not exists bagItems', () => {
      const expectedResult = 0;

      expect(
        selectors.getBagItemsCounter({
          ...mockState,
          entities: { bagItems: [] },
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('getBagTotalQuantity()', () => {
    it('should return the bagItems total quantity when bagItems exists', () => {
      const expectedResult = 65;

      expect(selectors.getBagTotalQuantity(mockState)).toEqual(expectedResult);
    });

    it('should return the bagItems total quantity excluding a specific product type', () => {
      const expectedResult = 63;
      const excludeProductTypes = [mockProductTypeToExclude];

      expect(
        selectors.getBagTotalQuantity(mockState, excludeProductTypes),
      ).toEqual(expectedResult);
    });

    it('should return 0 when does not exists bagItems', () => {
      const expectedResult = 0;

      expect(
        selectors.getBagTotalQuantity({
          ...mockState,
          entities: { bagItems: [] },
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('isBagItemLoading()', () => {
    it('should get the bag item loading status', () => {
      const spy = jest.spyOn(fromBag, 'getIsBagItemLoading');

      expect(selectors.isBagItemLoading(mockState, mockBagItemId)).toEqual(
        true,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBagItemError()', () => {
    it('should get the bag item error', () => {
      const expectedResult = mockState.bag.bagItems.error[mockBagItemId];
      const spy = jest.spyOn(fromBag, 'getItemError');

      expect(selectors.getBagItemError(mockState, mockBagItemId)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBagItemsUnavailable()', () => {
    it('should not return any items if all items are available', () => {
      expect(selectors.getBagItemsUnavailable(mockState)).toHaveLength(0);
    });

    it('should return null if there is no bag loaded', () => {
      expect(
        selectors.getBagItemsUnavailable({
          ...mockState,
          entities: {},
        }),
      ).toBeUndefined();
    });

    it('should return an empty array if does not exist bagItems', () => {
      expect(
        selectors.getBagItemsUnavailable({
          ...mockState,
          entities: {
            bag: { [mockBagId]: { id: mockBagId, items: [] } },
          },
        }),
      ).toHaveLength(0);
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
    it('should return an mepty list if there are no sizes', () => {
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
      const expectedResult = [
        mockProduct.sizes[0],
        mockProduct.sizes[1],
        mockProduct.sizes[2],
        mockProduct.sizes[3],
        mockProduct.sizes[4],
        mockProduct.sizes[5],
        mockProduct.sizes[6],
        mockProduct.sizes[7],
      ];

      expect(
        selectors.getBagItemAvailableSizes(mockState, mockBagItemId),
      ).toEqual(expectedResult);
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

  describe('createGetItemInBag()', () => {
    const product = mockProduct;
    const size = mockBagItemEntity.size;

    it('should return the bag item that already exists', () => {
      const expectedResult = {
        ...mockState.entities.bagItems[101],
        product: mockProduct,
      };

      expect(
        selectors.createGetItemInBag(mockState)({
          product,
          size,
        }),
      ).toEqual(expectedResult);
    });

    it('should return undefined if the product id does not exists on bagItems', () => {
      const state = {
        ...mockState,
        entities: {
          bagItems: undefined,
          products: undefined,
        },
      };

      expect(
        selectors.createGetItemInBag(state)({
          product,
          size,
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
          id: mockBagItemId,
          isLoading: false,
          bagItems: {
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
          bagItems: {
            isLoading: {
              [mockBagItemId]: true,
            },
            error: {
              [mockBagItemId]: 'Oh no! Terrible error!',
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
          bagItems: {
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
        entities: {
          bag: { [mockBagId]: { id: mockBagId, items: [] } },
        },
        bag: {
          error: null,
          id: mockBagId,
          isLoading: false,
          bagItems: {
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
          bagItems: {
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

  describe('getItemWholeQuantity()', () => {
    it('should get the quantity of all bag items who share the same product and size', () => {
      const expectedResult = 15;

      expect(
        selectors.getItemWholeQuantity(mockState, {
          ...mockBagItemEntity,
          product: { id: mockProductId },
        }),
      ).toBe(expectedResult);
    });

    it('should return 0 if there is no bag', () => {
      const mockStateWithoutBag = {
        ...mockState,
        bag: {},
        entities: {
          ...mockState.entities,
          bag: {},
          bagItems: {},
        },
      };

      expect(
        selectors.getItemWholeQuantity(mockStateWithoutBag, {
          product: { id: mockProductId },
          size: 1,
        }),
      ).toBe(0);
    });
  });
});
