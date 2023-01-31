import * as helpers from '../../../../helpers';
import {
  getProduct,
  getProductLabelsByPriority,
  getProductPromotions,
  isProductOneSize,
  isProductOutOfStock,
} from '..';
import {
  mockLabels,
  mockOneSizeSizes,
  mockProduct,
  mockProductId,
  mockPromotions,
  mockSortedLabels,
} from 'tests/__fixtures__/products';

jest.mock('../../../../helpers', () => {
  const original = jest.requireActual('../../../../helpers');

  return {
    ...original,
    sortProductLabelsByPriority: jest.fn((...args) =>
      original.sortProductLabelsByPriority(...args),
    ),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getProduct()', () => {
  it('should return the product entity', () => {
    const state = {
      entities: {
        products: {
          [mockProductId]: mockProduct,
        },
      },
    };

    expect(getProduct(state, mockProductId)).toEqual(mockProduct);
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
            sizes: null,
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
            sizes: null,
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
            sizes: [{ globalQuantity: 0 }],
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
    const state = {
      entities: {
        products: {
          [mockProductId]: { ...mockProduct, mockLabels },
        },
      },
    };

    expect(getProductLabelsByPriority(state, mockProductId)).toEqual(
      mockSortedLabels,
    );
    expect(helpers.sortProductLabelsByPriority).toHaveBeenCalledTimes(1);
    expect(helpers.sortProductLabelsByPriority).toHaveBeenCalledWith(
      getProduct(state, mockProductId),
      undefined,
    );
  });
});
