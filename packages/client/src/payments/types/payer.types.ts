import type { PaymentAddress } from '../../types/common/address.types';

export type Payer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: PaymentAddress;
};
