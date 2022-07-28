import type { Brand } from './brand.types';
import type { Category } from '../../categories/types';
import type { GenderCode } from '../../types';

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
