import type { Address, User } from '.';
import type { Config } from '../../../types';

export type PutUserDefaultBillingAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: Address['id'];
};

export type PutUserDefaultBillingAddress = (
  props: PutUserDefaultBillingAddressProps,
  config?: Config,
) => void;
