import type { Config } from '../../../types/index.js';

export type DeleteGuestToken = (id: string, config?: Config) => Promise<number>;
