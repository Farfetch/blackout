import type { Category } from '../../categories/types';
import type { GenderString } from '../../types';

export type GetDesignersQuery = {
  gender?: GenderString;
  priceType?: number;
  categoryId?: Category['id'];
};
