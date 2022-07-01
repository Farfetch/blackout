import { getEntities, getEntityById } from '../';

const mockBrandId = 6326412;
const mockCategoryId = 0;
const state = {
  entities: {
    brands: {
      [mockBrandId]: {
        id: 6326412,
        name: 'Converse X JW Anderson',
      },
      2450: {
        id: 2450,
        name: 'Balenciaga',
      },
    },
    categories: {
      [mockCategoryId]: {
        id: mockCategoryId,
        name: 'Made up category',
      },
    },
  },
};

describe('getEntities()', () => {
  it('should throw an error if there is no valid state', () => {
    // @ts-expect-error
    expect(() => getEntities(null, 'random')).toThrow();
    // @ts-expect-error
    expect(() => getEntities(undefined, 'random')).toThrow();
    // @ts-expect-error
    expect(() => getEntities({}, 'random')).toThrow();
  });

  it('should return undefined if there are no entities of the given name', () => {
    expect(getEntities(state, 'random')).toBeUndefined();
  });

  it('should return the entities of a specified name', () => {
    expect(getEntities(state, 'brands')).toEqual(state.entities.brands);
  });
});

describe('getEntityById()', () => {
  it('should return undefined if there is no valid id provided', () => {
    // @ts-expect-error Need to assert not having the third argument
    expect(getEntityById(state, 'brands')).toBeUndefined();
    expect(getEntityById(state, 'brands', undefined)).toBeUndefined();
    expect(getEntityById(state, 'brands', null)).toBeUndefined();
  });

  it('should return undefined if there is no entity of the given id', () => {
    expect(getEntityById(state, 'brands', 99999)).toBeUndefined();
  });

  it('should return the respective entity of the given id', () => {
    expect(getEntityById(state, 'brands', mockBrandId)).toEqual(
      state.entities.brands[mockBrandId],
    );
  });

  it('should return the respective entity of the given id, even with a falsy value', () => {
    expect(getEntityById(state, 'categories', mockCategoryId)).toEqual(
      state.entities.categories[mockCategoryId],
    );
  });
});
