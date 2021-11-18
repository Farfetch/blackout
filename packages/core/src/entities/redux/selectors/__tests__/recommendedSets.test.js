import { getRecommendedSet } from '..';

const mockRecommendedSetId = 123;
const mockRecommendedSetDetails = {
  name: 'cool set',
  products: [123, 456],
};

describe('getRecommendedSet()', () => {
  it('should return the product entity', () => {
    const state = {
      entities: {
        recommendedSets: {
          [mockRecommendedSetId]: mockRecommendedSetDetails,
        },
      },
    };

    expect(getRecommendedSet(state, mockRecommendedSetId)).toEqual(
      mockRecommendedSetDetails,
    );
  });

  it('should return the default response', () => {
    const state = {
      entities: {},
    };

    expect(getRecommendedSet(state, mockRecommendedSetId)).toBeUndefined();
  });
});
