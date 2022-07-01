import { compose } from 'lodash/fp';
import { entitiesMapper as entitiesMapperBag } from '../../bags/reducer';
import { entitiesMapper as entitiesMapperCheckout } from '../../checkout/reducer';
import { entitiesMapper as entitiesMapperMerchantsLocations } from '../../merchantsLocations/reducer';
import { entitiesMapper as entitiesMapperOrders } from '../../orders/reducer';
import { entitiesMapper as entitiesMapperPayments } from '../../payments/reducer';
import { entitiesMapper as entitiesMapperReturns } from '../../returns/reducer';
import { entitiesMapper as entitiesMapperUsers } from '../../users/reducer';
import { entitiesMapper as entitiesMapperWishlist } from '../../wishlists/reducer';
import { productsEntitiesMapper } from '../../products';
import { subscriptionsEntitiesMapper } from '../../subscriptions';
import createEntitiesReducer from './createEntities';
import type { AnyAction } from 'redux';
import type { StoreState } from '../../types';

// CustomEntitiesReducer is what was called previously as an "entities mapper"
// Every custom entities reducer will be guaranteed that it will receive a defined value
// because the default global entities educer will make sure that it will receive an object if the currrent entities
// state is undefined.
export type CustomEntitiesReducer = (
  state: NonNullable<StoreState['entities']>,
  action: AnyAction,
) => StoreState['entities'];

export type CustomEntitiesReducerByAction = Record<
  string,
  CustomEntitiesReducer
>;

type DefaultEntitiesReducers = Record<string, CustomEntitiesReducerByAction>;

type DefaultEntitiesReducerCreator = (
  customEntitiesReducers: CustomEntitiesReducerByAction[],
) => CustomEntitiesReducer;

type EntitiesReducerByActionNormalizer = (
  customActionEntitiesReducers: CustomEntitiesReducerByAction[],
) => CustomEntitiesReducerByAction;

// Default entities mappers for all redux functionalities.
// Each `entitiesMapper` has to have an `typeof` in the object key to allow TS to understand
// it's name.
// In a nutshell (https://www.techatbloomberg.com/blog/10-insights-adopting-typescript-at-scale/):
// "If an interface needed by a declaration is not exported, tsc will refuse to inline the type and
// will generate a clear error (e.g., TS4023: Exported variable has or is using name from external
// module but cannot be named.)"
// Playground representation - https://tinyurl.com/a8srpa4u
export const defaultEntitiesReducers: DefaultEntitiesReducers = {
  bag: entitiesMapperBag,
  checkout: entitiesMapperCheckout,
  merchantsLocations: entitiesMapperMerchantsLocations,
  orders: entitiesMapperOrders,
  payments: entitiesMapperPayments,
  products: productsEntitiesMapper,
  users: entitiesMapperUsers,
  returns: entitiesMapperReturns,
  subscriptions: subscriptionsEntitiesMapper,
  wishlist: entitiesMapperWishlist,
};

// Function that merges entities mappers and runs duplicate action keys.
export const mergeEntitiesReducersByAction: EntitiesReducerByActionNormalizer =
  entitiesMappers => {
    const result: CustomEntitiesReducerByAction = {};
    const duplicatedEntitiesReducers: Record<string, CustomEntitiesReducer[]> =
      {};

    entitiesMappers.forEach(entityMapper => {
      for (const actionType in entityMapper) {
        if (actionType in result) {
          if (actionType in duplicatedEntitiesReducers) {
            duplicatedEntitiesReducers[actionType]?.push(
              entityMapper[actionType] as CustomEntitiesReducer,
            );
          } else {
            duplicatedEntitiesReducers[actionType] = [
              result[actionType] as CustomEntitiesReducer,
              entityMapper[actionType] as CustomEntitiesReducer,
            ];
          }
        } else {
          result[actionType] = entityMapper[
            actionType
          ] as CustomEntitiesReducer;
        }
      }
    });

    for (const actionType in duplicatedEntitiesReducers) {
      const newEntityReducer: CustomEntitiesReducer = (state, action) => {
        const duplicatedReducers = duplicatedEntitiesReducers[
          actionType
        ] as CustomEntitiesReducer[];

        return compose(...duplicatedReducers)(state, action);
      };

      result[actionType] = newEntityReducer;
    }

    return result;
  };

const createDefaultEntitiesReducer: DefaultEntitiesReducerCreator = (
  extraMappers = [],
) =>
  createEntitiesReducer(
    mergeEntitiesReducersByAction([
      ...Object.values(defaultEntitiesReducers),
      // These are overrides - must be in the last position
      ...extraMappers,
    ]),
  );

export default createDefaultEntitiesReducer;
