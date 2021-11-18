import { getCategory } from '../';
import {
  mockCategory,
  mockCategoryId,
  mockState,
} from 'tests/__fixtures__/categories';

describe('getCategory()', () => {
  it('should return the category entity', () => {
    expect(getCategory(mockState, mockCategoryId)).toEqual(mockCategory);
  });
});
