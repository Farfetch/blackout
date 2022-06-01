import { entitiesMapper as wishlistsSetsEntitiesMapper } from './wishlistsSets';
import wishlistsReducer, {
  entitiesMapper as wishlistsEntitiesMapper,
} from './wishlists';

export const entitiesMapper = {
  ...wishlistsEntitiesMapper,
  ...wishlistsSetsEntitiesMapper,
};

export default wishlistsReducer;
