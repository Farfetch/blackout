import type { Address, User } from '.';
import type { Config } from '../../types';

export type DeleteAddressProps = {
  id: Address['id'];
  userId: User['id'];
};

export type DeleteAddress = (
  props: DeleteAddressProps,
  config?: Config,
) => void;
