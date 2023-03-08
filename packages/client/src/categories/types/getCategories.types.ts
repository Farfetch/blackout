import type { Category } from './category.types.js';
import type { Config } from '../../index.js';

export type GetCategories = (config?: Config) => Promise<Category[]>;
