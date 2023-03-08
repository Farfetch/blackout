import type { Config } from '../../../types/index.js';
import type { User } from './user.types.js';

export type GetUser = (config?: Config) => Promise<User>;
