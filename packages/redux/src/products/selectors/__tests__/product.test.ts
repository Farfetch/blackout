import {
  getProduct,
  getProductLabelsByPriority,
  getProductPromotions,
  isProductOneSize,
  isProductOutOfStock,
} from '../index.js';
import {
  mockOneSizeSizes,
  mockProduct,
  mockProductId,
  mockProductSizeAdapted,
  mockProductsState,
  mockPromotions,
} from 'tests/__fixtures__/products/index.mjs';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getProduct()', () => {
  it('should return the product entity', () => {
    expect(getProduct(mockProductsState, mockProductId)).toEqual(mockProduct);
  });

  it('should return the default response', () => {
    const state = {
      entities: {},
    };

    expect(getProduct(state, mockProductId)).toBeUndefined();
  });
});

describe('isProductOneSize()', () => {
  it('should return true if product is one size', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: {
            ...mockProductsState.entities.products[mockProductId],
            sizes: mockOneSizeSizes,
          },
        },
      },
    };

    expect(isProductOneSize(state, mockProductId)).toBe(true);
  });

  it("should return false if product isn't one size", () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: mockProduct,
        },
      },
    };

    expect(isProductOneSize(state, mockProductId)).toBe(false);
  });

  it('should return false if no sizes are available', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: {
            ...mockProductsState.entities.products[mockProductId],
            sizes: [],
          },
        },
      },
    };

    expect(isProductOneSize(state, mockProductId)).toBe(false);
  });
});

describe('isProductOutOfStock()', () => {
  it('should return true if product is out of stock', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: {
            ...mockProductsState.entities.products[mockProductId],
            sizes: [],
          },
        },
      },
    };

    expect(isProductOutOfStock(state, mockProductId)).toBe(true);
  });

  it('should return true if product has no quantity', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: {
            ...mockProductsState.entities.products[mockProductId],
            sizes: [{ ...mockProductSizeAdapted, globalQuantity: 0 }],
          },
        },
      },
    };

    expect(isProductOutOfStock(state, mockProductId)).toBe(true);
  });

  it('should return true if the product is one size and is out of stock', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: {
            ...mockProductsState.entities.products[mockProductId],
            sizes: [
              {
                ...mockProductSizeAdapted,
                isOneSize: true,
                isOutOfStock: true,
              },
            ],
          },
        },
      },
    };

    expect(isProductOutOfStock(state, mockProductId)).toBe(true);
  });

  it("should return false if product isn't out of stock", () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: mockProduct,
        },
      },
    };

    expect(isProductOutOfStock(state, mockProductId)).toBe(false);
  });
});

describe('getProductPromotions()', () => {
  it('should return an empty list if promotions property is not specified', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: {
            ...mockProduct,
            promotions: undefined,
          },
        },
      },
    };

    // @ts-expect-error Setting promotions to undefined for testing
    expect(getProductPromotions(state, mockProductId)).toHaveLength(0);
  });

  it('should return an empty list if there are no promotions available', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: {
            ...mockProduct,
            promotions: null,
          },
        },
      },
    };

    expect(getProductPromotions(state, mockProductId)).toHaveLength(0);
  });

  it('should return a list of promotions', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: mockProduct,
        },
      },
    };

    expect(getProductPromotions(state, mockProductId)).toEqual(mockPromotions);
  });
});

describe('getProductLabelsByPriority()', () => {
  it('should get the labels by the default priority', () => {
    const labels = [
      { id: 1502, name: 'Label 2', priority: 2 },
      { id: 1503, name: 'Label 3', priority: 3 },
      { id: 1501, name: 'Label 1', priority: 1 },
    ];
    const sortedLabels = [
      { id: 1501, name: 'Label 1', priority: 1 },
      { id: 1502, name: 'Label 2', priority: 2 },
      { id: 1503, name: 'Label 3', priority: 3 },
    ];
    const state = {
      entities: {
        products: {
          [mockProductId]: { ...mockProduct, labels },
        },
      },
    };

    expect(getProductLabelsByPriority(state, mockProductId)).toEqual(
      sortedLabels,
    );
  });

  it('should get the labels by the desc priority', () => {
    const labels = [
      { id: 1502, name: 'Label 2', priority: 2 },
      { id: 1503, name: 'Label 3', priority: 3 },
      { id: 1501, name: 'Label 1', priority: 1 },
    ];
    const sortedLabels = [
      { id: 1503, name: 'Label 3', priority: 3 },
      { id: 1502, name: 'Label 2', priority: 2 },
      { id: 1501, name: 'Label 1', priority: 1 },
    ];
    const state = {
      entities: {
        products: {
          [mockProductId]: { ...mockProduct, labels },
        },
      },
    };

    expect(getProductLabelsByPriority(state, mockProductId, 'desc')).toEqual(
      sortedLabels,
    );
  });
});
