import type { Gender, GenderCode } from '../../types';

export type Category = {
  id: number;
  name: string;
  parentId?: number;
  uuid?: string;
  gender?: Gender;
};

export type ProductCategory = Omit<Category, 'uuid' | 'gender'> & {
  gender: GenderCode;
};
