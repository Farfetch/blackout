import { getCategories, getCategory } from '../';
import { mockCategory, mockCategoryId } from 'tests/__fixtures__/categories';

describe('getCategory()', () => {
  it('should return the category entity for given id', () => {
    const state = {
      entities: {
        categories: {
          [mockCategoryId]: mockCategory,
        },
      },
    };

    expect(getCategory(state, mockCategoryId)).toEqual(mockCategory);
  });
});

describe('getCategories()', () => {
  it('should return the category entity', () => {
    const state = {
      entities: {
        categories: {
          [mockCategoryId]: mockCategory,
        },
      },
    };

    expect(getCategories(state)).toEqual(state.entities.categories);
  });
});
