import type { Config } from '../../../types';

export type DeleteGuestToken = (id: string, config?: Config) => Promise<number>;
