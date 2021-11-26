import type { Address } from '.';

export type Payer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
};
