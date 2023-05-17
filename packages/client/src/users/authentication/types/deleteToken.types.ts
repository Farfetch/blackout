import type { Config } from '../../../types/index.js';

export type DeleteToken = (id: string, config?: Config) => Promise<number>;
