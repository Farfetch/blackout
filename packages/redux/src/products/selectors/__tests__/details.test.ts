import * as fromBags from '../../../bags/selectors';
import * as fromProductEntities from '../product';
import * as selectors from '../details';
import {
  mockBrandId,
  mockBreadCrumbs,
  mockGroupedEntries,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';
import { mockCategoryId } from 'tests/__fixtures__/categories';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Product', () => {
  describe('getProductError()', () => {
    it('should get the product details error property from state', () => {
      const expectedResult =
        mockProductsState.products.details.error[mockProductId];

      expect(
        selectors.getProductError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('isProductFetched()', () => {
    it('should return true if the product is successfully fetched', () => {
      expect(selectors.isProductFetched(mockProductsState, mockProductId)).toBe(
        true,
      );
    });

    it('should return false if the product is not successfully fetched', () => {
      expect(selectors.isProductFetched(mockProductsState, 789)).toBe(false);
    });

    it('should return true if the product is only SSR (hydrated)', () => {
      const changedMockState = {
        products: {
          ...mockProductsState.products,
          details: {
            ...mockProductsState.products.details,
            isHydrated: {
              ...mockProductsState.products.details.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(selectors.isProductFetched(changedMockState, mockProductId)).toBe(
        true,
      );
    });
  });

  describe('isProductDuplicated()', () => {
    it('should return true if the product is duplicated', () => {
      const changedMockState = {
        products: mockProductsState.products,
        entities: {
          products: {
            [mockProductId]: {
              ...mockProductsState.entities.products[mockProductId],
              isDuplicated: true,
            },
          },
        },
      };

      expect(
        selectors.isProductDuplicated(changedMockState, mockProductId),
      ).toBe(true);
    });

    it('should return false if the product is not duplicated', () => {
      expect(
        selectors.isProductDuplicated(mockProductsState, mockProductId),
      ).toBe(false);
    });
  });

  describe('isProductHydrated()', () => {
    it('should get the hydrated status of a given product', () => {
      const changedMockState = {
        products: {
          ...mockProductsState.products,
          details: {
            ...mockProductsState.products.details,
            isHydrated: {
              ...mockProductsState.products.details.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(selectors.isProductHydrated(changedMockState, mockProductId)).toBe(
        true,
      );
    });
  });

  describe('isProductLoading()', () => {
    it('should get the loading status of a given product', () => {
      const changedMockState = {
        products: {
          ...mockProductsState.products,
          details: {
            ...mockProductsState.products.details,
            isLoading: {
              ...mockProductsState.products.details.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(selectors.isProductLoading(changedMockState, mockProductId)).toBe(
        true,
      );
    });
  });

  describe('getProductBreadcrumbs()', () => {
    it('should get the breadCrumbs', () => {
      expect(
        selectors.getProductBreadcrumbs(mockProductsState, mockProductId),
      ).toEqual(mockBreadCrumbs);
    });
  });

  describe('getProductSizeRemainingQuantity()', () => {
    const sizeId =
      mockProductsState.entities.products[mockProductId].sizes![0]!.id;
    const getProductReturn = mockProductsState.entities.products[mockProductId];
    const getProductDenormalizedReturn = {
      ...mockProductsState.entities.products[mockProductId],
      brand: mockProductsState.entities.brands[mockBrandId],
      categories: [
        mockProductsState.entities!.categories![
          mockCategoryId as keyof typeof mockProductsState.entities.categories
        ],
      ],
    };

    let spyGetProduct: ReturnType<typeof jest.spyOn> | undefined;
    let spyGetProductDenormalized: ReturnType<typeof jest.spyOn> | undefined;
    let spyGetBagItems: ReturnType<typeof jest.spyOn> | undefined;

    beforeEach(() => {
      spyGetProduct = jest.spyOn(fromProductEntities, 'getProduct');
      spyGetProductDenormalized = jest.spyOn(
        fromProductEntities,
        'getProductDenormalized',
      );
      spyGetBagItems = jest.spyOn(fromBags, 'getBagItems');
    });

    afterEach(() => {
      spyGetProduct.mockRestore();
      spyGetProductDenormalized.mockRestore();
      spyGetBagItems.mockRestore();
    });

    it('should get remaining quantity with bagItems', () => {
      const bagItem = mockProductsState.entities.bagItems[102];
      const globalQuantity = bagItem.size.globalQuantity;
      const bagQuantity = bagItem.quantity;
      const expectedResult = globalQuantity - bagQuantity;

      expect(
        selectors.getProductSizeRemainingQuantity(
          mockProductsState,
          mockProductId,
          bagItem.size.id,
        ),
      ).toBe(expectedResult);
    });

    it('should get remaining quantity with bagItems of different sizes', () => {
      const getBagItemReturn = {
        ...mockProductsState.entities.bagItems[101],
        product: mockProductsState.entities.products[mockProductId],
      };

      const sizeSelected = getProductReturn.sizes![1]!;
      const globalQuantity = sizeSelected.globalQuantity;

      spyGetProduct.mockImplementation(() => getProductReturn);
      spyGetBagItems.mockImplementation(() => getBagItemReturn);

      expect(
        selectors.getProductSizeRemainingQuantity(
          mockProductsState,
          mockProductId,
          sizeSelected.id,
        ),
      ).toBe(globalQuantity);
    });

    it('should get remaining quantity with bagItems of different merchants', () => {
      const getBagItemReturn = {
        ...mockProductsState.entities.bagItems[101],
        product: mockProductsState.entities.products[mockProductId],
      };

      const globalQuantity = getBagItemReturn.size.globalQuantity;
      const bagQuantity = 2;
      const expectedResult = globalQuantity - bagQuantity;

      expect(
        selectors.getProductSizeRemainingQuantity(
          mockProductsState,
          mockProductId,
          sizeId,
        ),
      ).toBe(expectedResult);
    });

    it('should get remaining quantity when there are no bagItems', () => {
      const state = {
        ...mockProductsState,
        bag: {
          ...mockProductsState.bag,
          items: { ...mockProductsState.bag.items, ids: [] },
        },
        entities: {
          bagItems: undefined,
          products: undefined,
        },
      };
      const getBagItemsReturn = false;
      const globalQuantity = getProductReturn.sizes![0]!.globalQuantity;

      spyGetProductDenormalized.mockImplementation(
        () => getProductDenormalizedReturn,
      );
      spyGetBagItems.mockImplementation(() => getBagItemsReturn);

      expect(
        selectors.getProductSizeRemainingQuantity(state, mockProductId, sizeId),
      ).toBe(globalQuantity);
    });

    it('should get remaining quantity when product is added for the first time', () => {
      const state = {
        ...mockProductsState,
        bag: {
          ...mockProductsState.bag,
          items: { ...mockProductsState.bag.items, ids: [102] },
        },
        entities: {
          ...mockProductsState.entities,
          bagItems: {
            102: mockProductsState.entities.bagItems[102],
          },
        },
      };
      const getBagItemsReturn = [
        {
          ...state.entities.bagItems[102],
          product: state.entities.products[mockProductId],
        },
      ];
      const globalQuantity = getProductReturn.sizes![0]!.globalQuantity;

      spyGetProduct.mockImplementation(() => getProductReturn);
      spyGetBagItems.mockImplementation(() => getBagItemsReturn);

      expect(
        selectors.getProductSizeRemainingQuantity(state, mockProductId, sizeId),
      ).toBe(globalQuantity);
    });
  });

  describe('getAllProductSizesRemainingQuantity()', () => {
    let spyGetProduct: ReturnType<typeof jest.spyOn> | undefined;
    let spyGetBagItems: ReturnType<typeof jest.spyOn> | undefined;

    beforeEach(() => {
      spyGetProduct = jest.spyOn(fromProductEntities, 'getProduct');
      spyGetBagItems = jest.spyOn(fromBags, 'getBagItems');
    });

    afterEach(() => {
      spyGetProduct.mockRestore();
      spyGetBagItems.mockRestore();
    });

    it('should return the updated product sizes', () => {
      const bagItem = mockProductsState.entities.bagItems[102];
      const product = mockProductsState.entities.products[mockProductId];
      const size = product.sizes!.find(({ id }) => id === bagItem.size.id);
      const globalQuantity = bagItem.size.globalQuantity;
      const bagQuantity = bagItem.quantity;
      const expectedResult = globalQuantity - bagQuantity;

      expect(
        selectors.getAllProductSizesRemainingQuantity(
          mockProductsState,
          mockProductId,
        ),
      ).toEqual(
        expect.arrayContaining([
          {
            ...size,
            globalQuantity: expectedResult,
          },
        ]),
      );
    });

    it("should return an empty array when the product or its sizes don't exist", () => {
      expect(
        selectors.getAllProductSizesRemainingQuantity(
          mockProductsState,
          mockProductId + 1,
        ),
      ).toEqual([]);
    });
  });

  describe('getProductGroupedEntries()', () => {
    it('should get the color grouping', () => {
      const expectedResult = {
        totalItems: mockGroupedEntries.totalItems,
        remaining:
          mockGroupedEntries.totalItems - mockGroupedEntries.entries.length,
        entries: mockGroupedEntries.entries,
      };

      expect(
        selectors.getProductGroupedEntries(mockProductsState, 12913174),
      ).toEqual(expectedResult);
    });

    it('should return undefined when the product does not have color grouping', () => {
      expect(
        selectors.getProductGroupedEntries(mockProductsState, 12913172),
      ).toBeUndefined();
    });
  });
});
