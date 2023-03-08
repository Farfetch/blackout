import type { Brand } from '../../brands/types/index.js';
import type { Category } from '../../categories/types/index.js';

export type SizeGuidesQuery = {
  brandIds?: Array<Brand['id']>;
  categoryIds?: Array<Category['id']>;
};
