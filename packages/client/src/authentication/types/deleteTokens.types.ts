import type { Config } from '../../types';

export type DeleteTokens = (id: string, config: Config) => Promise<number>;
