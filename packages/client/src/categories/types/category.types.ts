import type { Gender, GenderCode } from '../../types/index.js';

export type Category = {
  id: number;
  name: string;
  uuid?: string;
  gender?: Gender;
  slug?: string;
  parentId?: number;
};

export type ProductCategory = Omit<Category, 'uuid' | 'gender'> & {
  gender: GenderCode;
};

export type ProductCategoryWithGenderDescription = Omit<
  ProductCategory,
  'gender'
> & {
  gender: Gender;
};
