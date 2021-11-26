import type { Brand } from './brand.types';

export type GetBrand = (
  id: Brand['id'],
  config?: Record<string, unknown>,
) => Promise<Brand>;
