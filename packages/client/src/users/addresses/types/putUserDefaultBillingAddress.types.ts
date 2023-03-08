import type { Config, UserAddress } from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type PutUserDefaultBillingAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: UserAddress['id'];
};

export type PutUserDefaultBillingAddress = (
  props: PutUserDefaultBillingAddressProps,
  config?: Config,
) => void;
