import * as actionTypes from '../../actionTypes';
import { getWishlistId } from '../../selectors';
import { normalize } from 'normalizr';
import wishlistSetSchema from '../../../entities/schemas/wishlistSet';
import type { Dispatch } from 'redux';
import type { FetchWishlistSetsAction } from '../../types';
import type {
  GetWishlistSets,
  WishlistSets,
} from '@farfetch/blackout-client/wishlists/types';
import type { StoreState } from '../../../types';

/**
 * @callback FetchWishlistSetsThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client
 * to load wishlist sets for a given wishlist id.
 *
 * @memberof module:wishlists/actions/factories
 *
 * @param {Function} getWishlistSets - Get wishlists sets client.
 *
 * @returns {FetchWishlistSetsThunkFactory} Thunk factory.
 */
const fetchWishlistSetsFactory =
  (getWishlistSets: GetWishlistSets) =>
  (config?: Record<string, unknown>) =>
  async (
    dispatch: Dispatch<FetchWishlistSetsAction>,
    getState: () => StoreState,
  ): Promise<WishlistSets | undefined> => {
    const state = getState();
    const wishlistId = getWishlistId(state);

    if (!wishlistId) {
      throw new Error('No wishlist id is set');
    }

    dispatch({
      type: actionTypes.FETCH_WISHLIST_SETS_REQUEST,
    });

    try {
      const result = await getWishlistSets(wishlistId, config);

      dispatch({
        payload: normalize(result, [wishlistSetSchema]),
        type: actionTypes.FETCH_WISHLIST_SETS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_WISHLIST_SETS_FAILURE,
      });

      throw error;
    }
  };

export default fetchWishlistSetsFactory;
