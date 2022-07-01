import type { LoginResponse } from './login.types';

// Register and login responses share the same type
export type RegisterResponse = LoginResponse;
