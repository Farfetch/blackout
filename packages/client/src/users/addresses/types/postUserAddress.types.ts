import type {
  Config,
  UserAddress,
  UserAddressInput,
} from '../../../types/index.js';
import type { User } from '../../../users/authentication/types/user.types.js';

export type PostUserAddressProps = {
  // Identifier of the user.
  userId: User['id'];
};

export type PostUserAddress = (
  props: PostUserAddressProps,
  data: UserAddressInput,
  config?: Config,
) => Promise<UserAddress>;
