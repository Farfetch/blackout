import { createSelector } from 'reselect';
import {
  getReturnItemsEntities,
  getReturnsEntities,
} from '../../returns/index.js';
import { getUserReturns as getUserReturnsFromReducer } from '../reducer.js';
import type { Return, ReturnItem } from '@farfetch/blackout-client';
import type {
  ReturnEntity,
  ReturnEntityDenormalized,
  ReturnItemEntity,
  UserReturnsResultDenormalized,
} from '../../entities/index.js';
import type { StoreState } from '../../types/storeState.types.js';
import type { UsersState } from '../types/state.types.js';

/**
 * Returns the loading status for the user returns operation.
 *
 * @param state - Application state.
 *
 * @returns User returns operation Loading status.
 */
export const areUserReturnsLoading = (state: StoreState) =>
  getUserReturnsFromReducer(state.users as UsersState).isLoading;

/**
 * Returns the user returns error.
 *
 * @param state - Application state.
 *
 * @returns User returns operation error.
 */
export const getUserReturnsError = (state: StoreState) =>
  getUserReturnsFromReducer(state.users as UsersState).error;

const denormalizeReturnItem = (
  returnItemId: ReturnItem['id'],
  returnItems: Record<ReturnItemEntity['id'], ReturnItemEntity> | undefined,
) => {
  if (!returnItems) {
    return;
  }

  const returnItemEntity = returnItems[returnItemId];

  if (!returnItemEntity) {
    return;
  }

  return returnItemEntity;
};

const denormalizeReturn = (
  returnId: Return['id'],
  returns: Record<ReturnEntity['id'], ReturnEntity> | undefined,
  returnItems: Record<ReturnItemEntity['id'], ReturnItemEntity> | undefined,
): ReturnEntityDenormalized | undefined => {
  if (!returns) {
    return;
  }

  const returnEntity = returns[returnId];

  if (!returnEntity) {
    return;
  }

  return {
    ...returnEntity,
    items: returnEntity.items
      .map(returnItemId => denormalizeReturnItem(returnItemId, returnItems))
      .filter(Boolean) as ReturnItemEntity[],
  };
};

/**
 * Returns the user returns.
 *
 * @param state - Application state.
 *
 * @returns User returns.
 */
export const getUserReturns: (
  state: StoreState,
) => UserReturnsResultDenormalized | undefined = createSelector(
  [
    (state: StoreState) =>
      getUserReturnsFromReducer(state.users as UsersState).result,
    getReturnsEntities,
    getReturnItemsEntities,
  ],
  (result, returns, returnItems) => {
    if (!result || !returns) {
      return;
    }

    return {
      ...result,
      entries: result.entries
        .map(returnId => denormalizeReturn(returnId, returns, returnItems))
        .filter(Boolean) as ReturnEntityDenormalized[],
    } as UserReturnsResultDenormalized;
  },
);

/**
 * Returns the fetched status for the user returns operation.
 *
 * @param state   - Application state.
 *
 * @returns User returns fetched status.
 */
export const areUserReturnsFetched: (state: StoreState) => boolean =
  createSelector(
    [
      (state: StoreState) =>
        getUserReturnsFromReducer(state.users as UsersState),
    ],
    userReturnsReducer =>
      !!userReturnsReducer?.result ||
      (!!userReturnsReducer?.error && !userReturnsReducer?.isLoading),
  );
