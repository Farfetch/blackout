import * as fromBags from '../../../../../bags/redux/selectors';
import * as fromProductEntities from '../../../../../entities/redux/selectors/products';
import * as selectors from '..';
import {
  mockBreadCrumbs,
  mockDetailsState,
  mockProductId,
} from 'tests/__fixtures__/products';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Product', () => {
  describe('getProductError()', () => {
    it('should get the product details error property from state', () => {
      const expectedResult = mockDetailsState.details.error[mockProductId];

      expect(
        selectors.getProductError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('isProductFetched()', () => {
    it('should return true if the product is successfully fetched', () => {
      expect(selectors.isProductFetched(mockDetailsState, mockProductId)).toBe(
        true,
      );
    });

    it('should return false if the product is not successfully fetched', () => {
      expect(selectors.isProductFetched(mockDetailsState, 789)).toBe(false);
    });

    it('should return true if the product is only SSR (hydrated)', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          isHydrated: {
            ...mockDetailsState.details.isLoading,
            [mockProductId]: true,
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
        ...mockDetailsState,
        entities: {
          products: {
            [mockProductId]: {
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
        selectors.isProductDuplicated(mockDetailsState, mockProductId),
      ).toBe(false);
    });
  });

  describe('isProductHydrated()', () => {
    it('should get the hydrated status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          isHydrated: {
            ...mockDetailsState.details.isLoading,
            [mockProductId]: true,
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
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          isLoading: {
            ...mockDetailsState.details.isLoading,
            [mockProductId]: true,
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
        selectors.getProductBreadcrumbs(mockDetailsState, mockProductId),
      ).toEqual(mockBreadCrumbs);
    });
  });

  describe('createGetProductRemainingQuantity()', () => {
    const sizeId =
      mockDetailsState.entities.products[mockProductId].sizes[0].id;
    const getProductReturn = mockDetailsState.entities.products[mockProductId];
    let spyGetProduct;
    let spyGetBagItems;

    beforeEach(() => {
      spyGetProduct = jest.spyOn(fromProductEntities, 'getProduct');
      spyGetBagItems = jest.spyOn(fromBags, 'getBagItems');
    });

    afterEach(() => {
      spyGetProduct.mockRestore();
      spyGetBagItems.mockRestore();
    });

    it('should get remaining quantity with bagItems', () => {
      const bagItem = mockDetailsState.entities.bagItems[102];
      const globalQuantity = bagItem.size.globalQuantity;
      const bagQuantity = bagItem.quantity;
      const expectedResult = globalQuantity - bagQuantity;

      expect(
        selectors.createGetProductRemainingQuantity(
          mockDetailsState,
          mockProductId,
        )(bagItem.size.id),
      ).toBe(expectedResult);
    });

    it('should get remaining quantity with bagItems of different sizes', () => {
      const getBagItemReturn = {
        ...mockDetailsState.entities.bagItems[101],
        product: mockDetailsState.entities.products[mockProductId],
      };

      const sizeSelected = getProductReturn.sizes[1];
      const globalQuantity = sizeSelected.globalQuantity;

      spyGetProduct.mockImplementation(() => getProductReturn);
      spyGetBagItems.mockImplementation(() => getBagItemReturn);

      expect(
        selectors.createGetProductRemainingQuantity(
          mockDetailsState,
          mockProductId,
        )(sizeSelected.id),
      ).toBe(globalQuantity);
    });

    it('should get remaining quantity with bagItems of different merchants', () => {
      const getBagItemReturn = {
        ...mockDetailsState.entities.bagItems[101],
        product: mockDetailsState.entities.products[mockProductId],
      };

      const globalQuantity = getBagItemReturn.size.globalQuantity;
      const bagQuantity = 2;
      const expectedResult = globalQuantity - bagQuantity;

      expect(
        selectors.createGetProductRemainingQuantity(
          mockDetailsState,
          mockProductId,
        )(sizeId),
      ).toBe(expectedResult);
    });

    it('should get remaining quantity when there are no bagItems', () => {
      const state = {
        ...mockDetailsState,
        entities: {
          bagItems: undefined,
          products: undefined,
        },
      };
      const getBagItemsReturn = false;
      const globalQuantity = getProductReturn.sizes[0].globalQuantity;

      spyGetProduct.mockImplementation(() => getProductReturn);
      spyGetBagItems.mockImplementation(() => getBagItemsReturn);

      expect(
        selectors.createGetProductRemainingQuantity(
          state,
          mockProductId,
        )(sizeId),
      ).toBe(globalQuantity);
    });

    it('should get remaining quantity when product is added for the first time', () => {
      const state = {
        ...mockDetailsState,
        entities: {
          bagItems: {
            102: { ...mockDetailsState.entities.bagItems[102] },
          },
          products: {
            1002: {
              ...mockDetailsState.entities.products[1002],
            },
          },
        },
      };
      const getBagItemsReturn = [
        {
          ...state.entities.bagItems[102],
          product: state.entities.products[1002],
        },
      ];
      const globalQuantity = getProductReturn.sizes[0].globalQuantity;

      spyGetProduct.mockImplementation(() => getProductReturn);
      spyGetBagItems.mockImplementation(() => getBagItemsReturn);

      expect(
        selectors.createGetProductRemainingQuantity(
          state,
          mockProductId,
        )(sizeId),
      ).toBe(globalQuantity);
    });
  });
});
