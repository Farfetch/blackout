import type { Config } from '../../../types';
import type { GuestUserNormalized } from '../..';
import type { User } from './user.types';

export type GetUser = (config?: Config) => Promise<User | GuestUserNormalized>;
