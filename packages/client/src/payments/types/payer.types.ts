import type {
  AddressBase,
  PaymentAddress,
} from '../../types/common/address.types';

export type Payer = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: PaymentAddress;
  dateOfBirth?: string;
};

export type PayerInput = Omit<Payer, 'address'> & {
  address?: AddressBase;
};
