import { entitiesMapper as entitiesMapperBag } from '../../bags/reducer.js';
import { entitiesMapper as entitiesMapperCheckout } from '../../checkout/reducer.js';
import { entitiesMapper as entitiesMapperExchangeFilters } from '../../exchanges/reducer.js';
import { entitiesMapper as entitiesMapperMerchantsLocations } from '../../merchantsLocations/reducer.js';
import { entitiesMapper as entitiesMapperOrders } from '../../orders/reducer.js';
import { entitiesMapper as entitiesMapperPayments } from '../../payments/reducer.js';
import { entitiesMapper as entitiesMapperRaffles } from '../../raffles/reducer.js';
import { entitiesMapper as entitiesMapperReturns } from '../../returns/reducer.js';
import { entitiesMapper as entitiesMapperUsers } from '../../users/reducer.js';
import { entitiesMapper as entitiesMapperWishlist } from '../../wishlists/reducer/index.js';
import { productsEntitiesMapper } from '../../products/index.js';
import { settingsEntitiesMapper } from '../../settings/reducer/index.js';
import { subscriptionsEntitiesMapper } from '../../subscriptions/index.js';
import createEntitiesReducer from './createEntities.js';
import type { AnyAction } from 'redux';
import type { StoreState } from '../../types/index.js';

// CustomEntitiesReducer is what was called previously as an "entities mapper"
// Every custom entities reducer will be guaranteed that it will receive a defined value
// because the default global entities reducer will make sure that it will receive an object if the currrent entities
// state is undefined.
export type CustomEntitiesReducer = (
  state: NonNullable<StoreState['entities']>,
  action: AnyAction,
) => NonNullable<StoreState['entities']>;

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
  configurations: settingsEntitiesMapper,
  exchangeFilters: entitiesMapperExchangeFilters,
  merchantsLocations: entitiesMapperMerchantsLocations,
  orders: entitiesMapperOrders,
  payments: entitiesMapperPayments,
  products: productsEntitiesMapper,
  raffles: entitiesMapperRaffles,
  returns: entitiesMapperReturns,
  subscriptions: subscriptionsEntitiesMapper,
  users: entitiesMapperUsers,
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

        let newState: NonNullable<StoreState['entities']> = state;

        duplicatedReducers.forEach(reducer => {
          newState = reducer(newState, action);
        });

        return newState;
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
