import type { Brand } from './brand.types';
import type { Config } from '../..';

export type GetBrand = (id: Brand['id'], config?: Config) => Promise<Brand>;
