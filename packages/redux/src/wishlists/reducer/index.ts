import { entitiesMapper as wishlistsSetsEntitiesMapper } from './wishlistsSets.js';
import wishlistsReducer, {
  entitiesMapper as wishlistsEntitiesMapper,
} from './wishlists.js';

export const entitiesMapper = {
  ...wishlistsEntitiesMapper,
  ...wishlistsSetsEntitiesMapper,
};

export default wishlistsReducer;
