import * as actionTypes from '../actionTypes.js';
import type { AnyAction } from 'redux';
import type { StoreState } from '../../types/index.js';
import type { SubscriptionsState } from '../types/index.js';

export const INITIAL_STATE: Record<
  string,
  SubscriptionsState['packages'][string]
> = {};

const subscriptionPackagesReducer = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: true,
          error: null,
        },
      };
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: {
          result: action.payload.result,
          isLoading: false,
          error: null,
        },
      };
    case actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: false,
          error: action.payload.error,
        },
      };
    case actionTypes.RESET_SUBSCRIPTION_PACKAGES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const removeSubscriptionPackagesFromEntities = (
  state: NonNullable<StoreState['entities']>,
) => ({ ...state, subscriptionPackages: undefined });

export const subscriptionPackagesEntitiesMapper = {
  [actionTypes.RESET_SUBSCRIPTION_PACKAGES]:
    removeSubscriptionPackagesFromEntities,
};

export default subscriptionPackagesReducer;
