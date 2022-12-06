import * as fromSharedWishlistReducer from './reducer';
import { createSelector } from 'reselect';
import { getEntityById } from '../entities/selectors';
import { getProduct } from '../products/selectors/product';
import type {
  SharedWishlist,
  SharedWishlistItem,
} from '@farfetch/blackout-client';
import type { SharedWishlistEntity } from '../entities/types';
import type { SharedWishlistState } from './types';
import type { StoreState } from '../types';

/**
 * Retrieves current user's shared wishlist id.
 *
 * @example
 * ```
 * import { getSharedWishlistId } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     sharedWishlistId: getSharedWishlistId(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Shared Wishlist result.
 */
export const getSharedWishlistId = (state: StoreState) =>
  fromSharedWishlistReducer.getResult(
    state.sharedWishlist as SharedWishlistState,
  );

/**
 * Retrieves the error state of the current user's shared wishlist.
 *
 * @example
 * ```
 * import { getSharedWishlistError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSharedWishlistError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information, `undefined` if there are no errors.
 */
export const getSharedWishlistError = (state: StoreState) =>
  fromSharedWishlistReducer.getError(
    state.sharedWishlist as SharedWishlistState,
  );

/**
 * Retrieves the loading status of the shared wishlist.
 *
 * This status is affected by the loading of the shared wishlist itself, as well as any
 * "add" operation.
 *
 * @example
 * ```
 * import { isSharedWishlistLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isSharedWishlistLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Loading status of the wishlist.
 */
export const isSharedWishlistLoading = (state: StoreState) =>
  fromSharedWishlistReducer.getIsLoading(
    state.sharedWishlist as SharedWishlistState,
  );

/**
 * Retrieves a specific shared wishlist by its id, with all properties populated (ie, the
 * product).
 *
 * @example
 * ```
 * import { getSharedWishlist } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { sharedWishlists: { id } }) => ({
 *     sharedWishlist: getSharedWishlist(state, id)
 * });
 * ```
 *
 * @param state     - Application state.
 * @param sharedWishlistId - Numeric identifier of the shared wishlist.
 *
 * @returns - Shared Wishlist item entity for the given id.
 */
export const getSharedWishlist = (
  state: StoreState,
  sharedWishlistId: SharedWishlist['id'],
) => {
  return getEntityById(state, 'sharedWishlists', sharedWishlistId);
};

/**
 * Retrieves a specific shared wishlist item by its id, with all properties populated (ie, the
 * product).
 *
 * @example
 * ```
 * import { getSharedWishlistItem } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { sharedWishlistItem: { id } }) => ({
 *     sharedWishlistItem: getSharedWishlistItem(state, id)
 * });
 * ```
 *
 * @param state     - Application state.
 * @param sharedWishlistItemId - Numeric identifier of the shared wishlist item.
 *
 * @returns - Shared Wishlist item entity for the given id.
 */

export const getSharedWishlistItem = (
  state: StoreState,
  sharedWishlistItemId: SharedWishlistItem['id'],
) => {
  const sharedWishlistItem = getEntityById(
    state,
    'sharedWishlistItems',
    sharedWishlistItemId,
  );

  if (!sharedWishlistItem) {
    return;
  }
  const product = getProduct(state, sharedWishlistItem.product);

  return {
    ...sharedWishlistItem,
    product,
  };
};

/**
 * Retrieves shared wishlist items from a specific wishlist
 *
 * @example
 * ```
 * import { getSharedWishlistItems } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { sharedWishlists: { id } }) => ({
 *     sharedWishlistItems: getSharedWishlistItems(state, id)
 * });
 * ```
 *
 * @param state     - Application state.
 * @param sharedWishlistId - Numeric identifier of the shared wishlist.
 *
 * @returns - Shared Wishlist Items entity for the given id.
 */
export const getSharedWishlistItems = createSelector(
  [
    (state: StoreState, sharedWishlistId: SharedWishlist['id']) =>
      getEntityById(
        state,
        'sharedWishlists',
        sharedWishlistId,
      ) as SharedWishlistEntity,
    state => state,
  ],
  (sharedWishlist, state) =>
    sharedWishlist.items.map(sharedWishlistItemId => {
      return getSharedWishlistItem(state, sharedWishlistItemId);
    }),
);
