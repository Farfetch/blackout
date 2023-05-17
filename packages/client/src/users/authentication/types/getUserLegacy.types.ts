import type { Config } from '../../../types/index.js';
import type { UserLegacy } from './login.types.js';

export type GetUserLegacy = (config?: Config) => Promise<UserLegacy>;
