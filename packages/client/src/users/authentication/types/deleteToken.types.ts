import type { Config } from '../../../types';

export type DeleteToken = (id: string, config?: Config) => Promise<number>;
