import type { Brand } from './brand.types';
import type { Category } from '../../categories/types';
import type { Gender } from '../../types';

export type BrandsQuery = {
  page?: number;
  pageSize?: number;
  gender?: Gender;
  id?: Brand['id'];
  exclusive?: number;
  categoryId?: Category['id'];
  departmentId?: number;
  priceType?: number;
};
