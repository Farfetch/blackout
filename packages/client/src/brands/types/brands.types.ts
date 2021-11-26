import type { Brand } from './brand.types';

export type Brands = {
  number: number;
  totalPages: number;
  totalItems: number;
  entries: Brand[];
};
