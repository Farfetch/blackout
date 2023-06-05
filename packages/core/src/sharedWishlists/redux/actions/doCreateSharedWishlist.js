import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import sharedWishlistSchema from '../../../entities/schemas/sharedWishlist';

/**
 * @callback CreateSharedWishlistThunkFactory
 *
 * @param {object} data - Details of the information of which wishlist
 * set is going to be shared.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create a new shared wishlist.
 *
 * @function doCreateSharedWishlist
 * @memberof module:wishlists/actions
 *
 * @param {Function} postSharedWishlist - Post shared wishlist client.
 *
 * @returns {CreateSharedWishlistThunkFactory} Thunk factory.
 */

export default postSharedWishlist =>
  (data, config) =>
  async (dispatch, getState, { getOptions = arg => ({ arg }) }) => {
    try {
      dispatch({ type: actionTypes.CREATE_SHARED_WISHLIST_REQUEST });

      const result = await postSharedWishlist(data, config);
      const { productImgQueryParam } = getOptions(getState);
      const newItems = result.items.map(item => ({
        ...item,
        productImgQueryParam,
      }));

      dispatch({
        payload: normalize(
          { ...result, items: newItems },
          sharedWishlistSchema,
        ),
        type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.CREATE_SHARED_WISHLIST_FAILURE,
      });
      throw error;
    }
  };
