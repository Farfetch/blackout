import type { Address, User } from '.';
import type { Config } from '../../types';

export type DeleteAddressProps = {
  // Identifier of the address.
  id: Address['id'];
  // Identifier of the user.
  userId: User['id'];
};

export type DeleteAddress = (
  props: DeleteAddressProps,
  config?: Config,
) => void;
