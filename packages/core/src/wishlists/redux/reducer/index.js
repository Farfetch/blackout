/**
 * @module wishlists/reducer
 * @category Wishlists
 * @subcategory Reducer
 */

import { entitiesMapper as wishlistsSetsEntitiesMapper } from './wishlistsSets';
import wishlistsReducer, {
  entitiesMapper as wishlistsEntitiesMapper,
} from './wishlists';

export const entitiesMapper = {
  ...wishlistsEntitiesMapper,
  ...wishlistsSetsEntitiesMapper,
};

export default wishlistsReducer;
