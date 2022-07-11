import type { GetUserResponse } from '@farfetch/blackout-client/src/users/types';
import type { LoginResponse } from '@farfetch/blackout-client';

export type User = LoginResponse | GetUserResponse;
