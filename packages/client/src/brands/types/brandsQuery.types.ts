import type { Brand } from './brand.types.js';
import type { Category } from '../../categories/types/index.js';
import type { GenderCode } from '../../types/index.js';

export type BrandsQuery = {
  page?: number;
  pageSize?: number;
  gender?: GenderCode;
  id?: Brand['id'] | string;
  exclusive?: number;
  categoryId?: Category['id'];
  departmentId?: number;
  priceType?: number;
};
