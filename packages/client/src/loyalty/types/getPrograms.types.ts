import type { Config } from '../../types';
import type { Program } from '.';

export type GetPrograms = (config?: Config) => Promise<Program[]>;
