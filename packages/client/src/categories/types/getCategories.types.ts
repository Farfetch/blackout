import type { Category } from './category.types';

export type GetCategories = (
  config?: Record<string, unknown>,
) => Promise<Category[]>;
