import type { Brand } from './brand.types';
import type { Category } from '../../categories/types';
import type { GenderEnum } from '../../types';

export type BrandsQuery = {
  page?: number;
  pageSize?: number;
  gender?: GenderEnum;
  id?: Brand['id'];
  exclusive?: number;
  categoryId?: Category['id'];
  departmentId?: number;
  priceType?: number;
};
