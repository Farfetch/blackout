import type { Category } from './category.types';
import type { Config } from '../..';

export type GetCategory = (
  categoryId: Category['id'],
  config?: Config,
) => Promise<Category>;
