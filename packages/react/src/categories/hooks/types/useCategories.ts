import type { BlackoutError, Category } from '@farfetch/blackout-client';
import type { CategoryEntity } from '@farfetch/blackout-redux';

export type GetRootCategory = (
  categoryId: Category['id'],
) => CategoryEntity | undefined;

export type UseCategories = () => {
  areCategoriesFetched: boolean | undefined;
  areCategoriesLoading: boolean | undefined;
  areTopCategoriesFetched: boolean | undefined;
  areTopCategoriesLoading: boolean | undefined;
  categories: CategoryEntity[];
  categoriesError: BlackoutError | null;
  fetchCategories: () => Promise<Category[]>;
  fetchTopCategories: () => Promise<Category[]>;
  getCategory: (id: Category['id']) => CategoryEntity | undefined;
  getRootCategory: GetRootCategory;
  resetCategoriesState: () => void;
  topCategories: Array<CategoryEntity | undefined>;
  topCategoriesError: BlackoutError | null;
};
