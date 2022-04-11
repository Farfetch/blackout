import type { Config } from '../../types';
import type { RegisterResponse } from './register.types';

interface Data {
  countryCode: string;
  email: string;
  password: string;
  username: string;
  name: string;
  phoneNumber?: string;
  titleId?: string;
  firstName?: string;
  lastName?: string;
  receiveNewsletters?: boolean;
}

export type PostRegister = (
  data: Data,
  config?: Config,
) => Promise<RegisterResponse>;
