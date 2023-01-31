import { entitiesMapper as addressesEntitiesMapper } from '../../../addresses/redux';
import { entitiesMapper as authenticationEntitiesMapper } from '../../../authentication/redux';
import { entitiesMapper as bagEntitiesMapper } from '../../../bags/redux';
import { entitiesMapper as checkoutEntitiesMapper } from '../../../checkout/redux';
import { entitiesMapper as detailsEntitiesMapper } from '../../../products/details/redux';
import { entitiesMapper as listingEntitiesMapper } from '../../../products/listing/redux';
import { entitiesMapper as merchantsLocationsEntitiesMapper } from '../../../merchantsLocations/redux';
import { entitiesMapper as ordersEntitiesMapper } from '../../../orders/redux';
import { entitiesMapper as paymentsEntitiesMapper } from '../../../payments/redux';
import { entitiesMapper as profileEntitiesMapper } from '../../../profile/redux';
import { entitiesMapper as returnsEntitiesMapper } from '../../../returns/redux';
import { entitiesMapper as subscriptionsEntitiesMapper } from '../../../subscriptions/redux';
import { entitiesMapper as wishlistEntitiesMapper } from '../../../wishlists/redux';
import createEntitiesReducer from './createEntities';

/**
 * Default entities mappers for all core funcionalities.
 */
export const defaultMappers = {
  addresses: addressesEntitiesMapper,
  authentication: authenticationEntitiesMapper,
  bag: bagEntitiesMapper,
  checkout: checkoutEntitiesMapper,
  details: detailsEntitiesMapper,
  listing: listingEntitiesMapper,
  merchantsLocations: merchantsLocationsEntitiesMapper,
  orders: ordersEntitiesMapper,
  payments: paymentsEntitiesMapper,
  profile: profileEntitiesMapper,
  returns: returnsEntitiesMapper,
  subscriptions: subscriptionsEntitiesMapper,
  wishlist: wishlistEntitiesMapper,
};

export default ({ ...extraMappers }) =>
  createEntitiesReducer({
    ...addressesEntitiesMapper,
    ...authenticationEntitiesMapper,
    ...bagEntitiesMapper,
    ...checkoutEntitiesMapper,
    ...detailsEntitiesMapper,
    ...listingEntitiesMapper,
    ...merchantsLocationsEntitiesMapper,
    ...ordersEntitiesMapper,
    ...paymentsEntitiesMapper,
    ...profileEntitiesMapper,
    ...returnsEntitiesMapper,
    ...subscriptionsEntitiesMapper,
    ...wishlistEntitiesMapper,
    ...extraMappers,
  });
