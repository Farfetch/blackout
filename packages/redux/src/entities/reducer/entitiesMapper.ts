// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@farfetch/blackout-client/addresses/redux' or ... Remove this comment to see the full error message
import { entitiesMapper as addressesEntitiesMapper } from '../../addresses';
import { entitiesMapper as authenticationEntitiesMapper } from '../../authentication';
import { entitiesMapper as bagEntitiesMapper } from '../../bags';
import { entitiesMapper as checkoutEntitiesMapper } from '../../checkout';
import { entitiesMapper as merchantsLocationsEntitiesMapper } from '../../merchantsLocations';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@farfetch/blackout-client/orders/redux' or its... Remove this comment to see the full error message
import { entitiesMapper as ordersEntitiesMapper } from '@farfetch/blackout-client/orders/redux';
import { entitiesMapper as paymentsEntitiesMapper } from '../../payments';
import { entitiesMapper as productsEntitiesMapper } from '../../products';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../../users' or it... Remove this comment to see the full error message
import { entitiesMapper as usersEntitiesMapper } from '../../users';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@farfetch/blackout-client/returns/redux' or it... Remove this comment to see the full error message
import { entitiesMapper as returnsEntitiesMapper } from '@farfetch/blackout-client/returns/redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '../.... Remove this comment to see the full error message
import { entitiesMapper as subscriptionsEntitiesMapper } from '../../subscriptions/reducer';
import { entitiesMapper as wishlistEntitiesMapper } from '../../wishlists';
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
  addresses: addressesEntitiesMapper,
  authentication: authenticationEntitiesMapper,
  bag: bagEntitiesMapper,
  checkout: checkoutEntitiesMapper,
  merchantsLocations: merchantsLocationsEntitiesMapper,
  orders: ordersEntitiesMapper,
  payments: paymentsEntitiesMapper,
  products: productsEntitiesMapper,
  users: usersEntitiesMapper,
  returns: returnsEntitiesMapper,
  subscriptions: subscriptionsEntitiesMapper,
  wishlist: wishlistEntitiesMapper,
};

const entitiesMapper: EntitiesMapper = ({ ...extraMappers }) =>
  createEntitiesReducer({
    ...addressesEntitiesMapper,
    ...authenticationEntitiesMapper,
    ...bagEntitiesMapper,
    ...checkoutEntitiesMapper,
    ...merchantsLocationsEntitiesMapper,
    ...ordersEntitiesMapper,
    ...paymentsEntitiesMapper,
    ...productsEntitiesMapper,
    ...usersEntitiesMapper,
    ...returnsEntitiesMapper,
    ...subscriptionsEntitiesMapper,
    ...wishlistEntitiesMapper,
    // These are overrides - must be in the last position
    ...extraMappers,
  });

export default entitiesMapper;
