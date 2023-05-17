import { createSelector } from 'reselect';
import { defaultTo, get } from 'lodash-es';
import { getEntities } from '../../entities/index.js';
import generateSubscriptionPackagesHash from '../helpers/generateSubscriptionPackagesHash.js';
import type {
  GetSubscriptionPackagesQuery,
  SubscriptionPackage,
} from '@farfetch/blackout-client';
import type { StoreState } from '../../types/index.js';

/*
 * @param state - Application state.
 * @param hash  - Hash key for each content.
 *
 * @returns - Content from a specific hash.
 */
const getContentByHash = (state: StoreState, hash: string) =>
  state.subscriptions?.packages[hash];

/**
 * Returns the error given a subscription package action.
 *
 * @param state - Application state.
 * @param query - Get subscription packages query.
 *
 * @returns Fetch subscription packages request error.
 */
export const getSubscriptionPackagesError = (
  state: StoreState,
  query?: GetSubscriptionPackagesQuery,
) => {
  const hash = generateSubscriptionPackagesHash(query);

  return defaultTo(getContentByHash(state, hash), null)?.error;
};

/**
 * Returns the result of a subscription package.
 *
 * @param state - Application state.
 * @param query - Get subscription packages query.
 *
 * @returns Fetch subscription packages result.
 */
export const getSubscriptionPackages: (
  state: StoreState,
  query?: GetSubscriptionPackagesQuery,
) => SubscriptionPackage[] | null | undefined = createSelector(
  (state: StoreState, query?: GetSubscriptionPackagesQuery) =>
    getContentByHash(state, generateSubscriptionPackagesHash(query))?.result,
  (state: StoreState) => getEntities(state, 'subscriptionPackages'),
  (subscriptionPackagesResult, subscriptionPackagesEntity) => {
    return (
      subscriptionPackagesResult &&
      (subscriptionPackagesResult.packages
        .map(packageId => get(subscriptionPackagesEntity, packageId))
        .filter(Boolean) as SubscriptionPackage[])
    );
  },
);

/**
 * Retrieves if subscription packages have been fetched.
 *
 * Will return true if a fetch request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areSubscriptionPackagesFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areSubscriptionPackagesFetched(state)
 * });
 * ```
 * @param state - Application state.
 * @param query - Get subscription packages query.
 *
 * @returns isFetched status of the subscription packages.
 */
export const areSubscriptionPackagesFetched = (
  state: StoreState,
  query?: GetSubscriptionPackagesQuery,
) =>
  (!!getSubscriptionPackages(state, query) ||
    !!getSubscriptionPackagesError(state, query)) &&
  !areSubscriptionPackagesLoading(state, query);

/**
 * Returns the loading status of a subscription package.
 *
 * @param state - Application state.
 * @param query - Get subscription packages query.
 *
 * @returns Subscription package loading status.
 */
export const areSubscriptionPackagesLoading = (
  state: StoreState,
  query?: GetSubscriptionPackagesQuery,
) => {
  const hash = generateSubscriptionPackagesHash(query);

  return getContentByHash(state, hash)?.isLoading;
};

/**
 * Returns the supported delivery channels for all subscription packages.
 *
 * @param state - Application state.
 * @param query - Get subscription packages query.
 *
 * @returns The supported delivery channels.
 */
export const getSubscriptionPackagesSupportedChannels = (
  state: StoreState,
  query?: GetSubscriptionPackagesQuery,
) => {
  const hash = generateSubscriptionPackagesHash(query);

  const result = getContentByHash(state, hash)?.result;

  return (result && result.supportedChannels) || undefined;
};
