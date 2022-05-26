import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { Category } from '@farfetch/blackout-client/categories/types';

export type GetRootCategory = (
  categoryId: Category['id'],
) => Category | undefined;

export type UseCategories = () => {
  areCategoriesFetched: boolean | undefined;
  areCategoriesLoading: boolean | undefined;
  areTopCategoriesFetched: boolean | undefined;
  areTopCategoriesLoading: boolean | undefined;
  categories: Category[];
  categoriesError: BlackoutError | null;
  fetchCategories: () => Promise<Category[]>;
  fetchTopCategories: () => Promise<Category[]>;
  getCategory: (id: Category['id']) => Category | undefined;
  getRootCategory: GetRootCategory;
  resetCategoriesState: () => void;
  topCategories: Array<Category | undefined>;
  topCategoriesError: BlackoutError | null;
};
