import type { Config, UserAddress, UserAddressInput } from '../../../types';
import type { User } from '../../../users/authentication/types/user.types';

export type PutUserAddressProps = {
  // Identifier of the address.
  userId: User['id'];
  // Identifier of the user.
  id: UserAddressInput['id'];
};

export type PutUserAddress = (
  props: PutUserAddressProps,
  data: UserAddressInput,
  config?: Config,
) => Promise<UserAddress>;
