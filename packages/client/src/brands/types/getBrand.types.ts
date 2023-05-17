import type { Brand } from './brand.types.js';
import type { Config } from '../../index.js';

export type GetBrand = (id: Brand['id'], config?: Config) => Promise<Brand>;
