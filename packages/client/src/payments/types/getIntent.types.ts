import type { Config } from '../../types';
import type { Intent } from '.';

export type GetIntent = (id: Intent['id'], config?: Config) => Promise<Intent>;
