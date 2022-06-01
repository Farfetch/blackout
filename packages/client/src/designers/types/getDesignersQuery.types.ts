import type { Category } from '../../categories/types';
import type { GenderString } from '../../types';

export type GetDesignersQuery = {
  // Gender: 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid.
  gender?: GenderString;
  // Price type: 0 = full price, 1 = sale, 2 = private sale.
  priceType?: number;
  // Category identifier.
  categoryId?: Category['id'];
};
