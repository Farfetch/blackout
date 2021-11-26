import type { Brand } from '../../brands/types';
import type { Category } from '../../categories/types';

export type SizeGuidesQuery = {
  brandIds?: Array<Brand['id']>;
  categoryIds?: Array<Category['id']>;
};
