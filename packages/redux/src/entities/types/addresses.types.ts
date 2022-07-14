import type { Address } from '@farfetch/blackout-client/src/users/addresses/types';

export type AddressEntity = Address;

export type AddressesEntity = Record<Address['id'], Address> | undefined;
