import { getSet } from '..';

const mockSetId = 123;
const mockSetDetails = {
  name: 'cool set',
  products: [123, 456],
};

describe('getSet()', () => {
  it('should return the set entity', () => {
    const state = {
      entities: {
        sets: {
          [mockSetId]: mockSetDetails,
        },
      },
    };

    expect(getSet(state, mockSetId)).toEqual(mockSetDetails);
  });

  it('should return the default response', () => {
    const state = {
      entities: {},
    };

    expect(getSet(state, mockSetId)).toBeUndefined();
  });
});
