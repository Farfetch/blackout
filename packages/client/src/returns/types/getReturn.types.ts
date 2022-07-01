import type { Config } from '../..';
import type { Return } from './return.types';

export type GetReturn = (id: number, config?: Config) => Promise<Return>;
