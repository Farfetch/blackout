import { entitiesMapper as entitiesMapperAddresses } from '../../addresses';
import { entitiesMapper as entitiesMapperAuthentication } from '../../authentication';
import { entitiesMapper as entitiesMapperBag } from '../../bags';
import { entitiesMapper as entitiesMapperCheckout } from '../../checkout';
import { entitiesMapper as entitiesMapperMerchantsLocations } from '../../merchantsLocations';
import { entitiesMapper as entitiesMapperOrders } from '../../orders';
import { entitiesMapper as entitiesMapperPayments } from '../../payments';
import { entitiesMapper as entitiesMapperReturns } from '../../returns';
import { entitiesMapper as entitiesMapperSubscriptions } from '../../subscriptions';
import { entitiesMapper as entitiesMapperUsers } from '../../users';
import { entitiesMapper as entitiesMapperWishlist } from '../../wishlists';
import { productsEntitiesMapper } from '../../products';
import createEntitiesReducer from './createEntities';
import type { Reducer } from 'redux';
import type { StoreState } from '../../types';

type EntitiesMapper = (data?: {
  extraMappers: Record<
    string,
    (state: StoreState['entities']) => StoreState['entities']
  >;
}) => Reducer<StoreState['entities']>;

// Default entities mappers for all redux functionalities.
// Each `entitiesMapper` has to have an `typeof` in the object key to allow TS to understand
// it's name.
// In a nutshell (https://www.techatbloomberg.com/blog/10-insights-adopting-typescript-at-scale/):
// "If an interface needed by a declaration is not exported, tsc will refuse to inline the type and
// will generate a clear error (e.g., TS4023: Exported variable has or is using name from external
// module but cannot be named.)"
// Playground representation - https://tinyurl.com/a8srpa4u
export const defaultMappers = {
  addresses: entitiesMapperAddresses,
  authentication: entitiesMapperAuthentication,
  bag: entitiesMapperBag,
  checkout: entitiesMapperCheckout,
  merchantsLocations: entitiesMapperMerchantsLocations,
  orders: entitiesMapperOrders,
  payments: entitiesMapperPayments,
  products: productsEntitiesMapper,
  users: entitiesMapperUsers,
  returns: entitiesMapperReturns,
  subscriptions: entitiesMapperSubscriptions,
  wishlist: entitiesMapperWishlist,
};

const entitiesMapper: EntitiesMapper = ({ ...extraMappers }) =>
  createEntitiesReducer({
    ...entitiesMapperAddresses,
    ...entitiesMapperAuthentication,
    ...entitiesMapperBag,
    ...entitiesMapperCheckout,
    ...entitiesMapperMerchantsLocations,
    ...entitiesMapperOrders,
    ...entitiesMapperPayments,
    ...productsEntitiesMapper,
    ...entitiesMapperUsers,
    ...entitiesMapperReturns,
    ...entitiesMapperSubscriptions,
    ...entitiesMapperWishlist,
    // These are overrides - must be in the last position
    ...extraMappers,
  });

export default entitiesMapper;
