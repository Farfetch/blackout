import type { Config } from '../../types/index.js';
import type { Program } from './index.js';

export type GetPrograms = (config?: Config) => Promise<Program[]>;
