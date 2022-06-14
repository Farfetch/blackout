import type { Address, User } from '.';
import type { Config } from '../../../types';

export type DeleteUserAddressProps = {
  // Identifier of the address.
  id: Address['id'];
  // Identifier of the user.
  userId: User['id'];
};

export type DeleteUserAddress = (
  props: DeleteUserAddressProps,
  config?: Config,
) => void;
