import type { UserAddress } from '@farfetch/blackout-client';

export type AddressEntity = UserAddress;

export type AddressesEntity =
  | Record<UserAddress['id'], UserAddress>
  | undefined;
