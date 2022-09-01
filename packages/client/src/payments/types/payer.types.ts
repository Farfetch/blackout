import type { PaymentAddress } from '../../types/common/address.types';

export type Payer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: PaymentAddress;
};
