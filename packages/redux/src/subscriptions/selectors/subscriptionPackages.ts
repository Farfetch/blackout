import { createSelector } from 'reselect';
import { defaultTo, get } from 'lodash-es';
import { getEntities } from '../../entities/index.js';
import type { StoreState } from '../../types/index.js';
import type { SubscriptionPackage } from '@farfetch/blackout-client';

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
 *
 * @returns Subscription package error.
 */
export const getSubscriptionPackagesError = (state: StoreState, hash: string) =>
  defaultTo(getContentByHash(state, hash), null)?.error;

/**
 * Returns the result of a subscription package.
 *
 * @param state - Application state.
 *
 * @returns Subscription package result.
 */
export const getSubscriptionPackages: (
  state: StoreState,
  hash: string,
) => SubscriptionPackage[] | null | undefined = createSelector(
  (state: StoreState, hash: string) => getContentByHash(state, hash)?.result,
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
 *
 * @returns isFetched status of the subscription packages.
 */
export const areSubscriptionPackagesFetched = (
  state: StoreState,
  hash: string,
) =>
  (!!getSubscriptionPackages(state, hash) ||
    !!getSubscriptionPackagesError(state, hash)) &&
  !areSubscriptionPackagesLoading(state, hash);

/**
 * Returns the loading status of a subscription package.
 *
 * @param state - Application state.
 *
 * @returns Subscription package loading status.
 */
export const areSubscriptionPackagesLoading = (
  state: StoreState,
  hash: string,
) => getContentByHash(state, hash)?.isLoading;

/**
 * Returns the supported delivery channels for all subscription packages.
 *
 * @param state - Application state.
 *
 * @returns The supported delivery channels.
 */
export const getSubscriptionPackagesSupportedChannels = (
  state: StoreState,
  hash: string,
) => {
  const result = getContentByHash(state, hash)?.result;

  return (result && result.supportedChannels) || undefined;
};
