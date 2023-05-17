import type { Category } from './category.types.js';
import type { Config } from '../../index.js';

export type GetCategory = (
  categoryId: Category['id'],
  config?: Config,
) => Promise<Category>;
