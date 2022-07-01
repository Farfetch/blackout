import type { Config } from '../..';
import type { Return } from './return.types';

export type PostReturn = (data: Return, config?: Config) => Promise<Return>;
