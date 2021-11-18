import { getRecommendedSetWithOutOfStock } from '..';
import { mockRecommendedSet, mockSetId } from 'tests/__fixtures__/products';

describe('getRecommendedSetWithOutOfStock()', () => {
  it('should return the product entity', () => {
    const state = {
      entities: {
        recommendedSetsWithOutOfStock: {
          [mockSetId]: mockRecommendedSet,
        },
      },
    };

    expect(getRecommendedSetWithOutOfStock(state, mockSetId)).toEqual(
      mockRecommendedSet,
    );
  });

  it('should return the default response', () => {
    const state = {
      entities: {},
    };

    expect(getRecommendedSetWithOutOfStock(state, mockSetId)).toBeUndefined();
  });
});
