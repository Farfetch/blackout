import type { Category } from './category.types';
import type { Config } from '../..';

export type GetCategories = (config?: Config) => Promise<Category[]>;
