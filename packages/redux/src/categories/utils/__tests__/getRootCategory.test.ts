import { mockCategories, mockCategoryId } from 'tests/__fixtures__/categories';
import getRootCategory from '../getRootCategory';
import type { Category } from '@farfetch/blackout-client';

describe('getRootCategory', () => {
  it('should return the root category correctly', () => {
    const result = getRootCategory(mockCategoryId, mockCategories);

    expect(result).toBe(mockCategories[1]);
  });

  it('should return the category itself if it`s a root category', () => {
    const rootCategory = mockCategories[1] as Category;
    const result = getRootCategory(rootCategory.id, mockCategories);

    expect(result).toBe(rootCategory);
  });
});
