import * as actionTypes from '../../../actionTypes.js';
import {
  type Closet,
  type ClosetItem,
  type Config,
  type DeleteUserClosetItem,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveUserClosetItemAction } from '../../types/actions.types.js';

/**
 * Method responsible for removing a specific item from user closet.
 *
 * @param deleteUserClosetItem - Delete user closet item client.
 *
 * @returns Thunk factory.
 */
const removeUserClosetItemFactory =
  (deleteUserClosetItem: DeleteUserClosetItem) =>
  (
    userId: User['id'],
    closetId: Closet['id'],
    itemId: ClosetItem['id'],
    config?: Config,
  ) =>
  async (dispatch: Dispatch<RemoveUserClosetItemAction>): Promise<number> => {
    try {
      dispatch({
        type: actionTypes.REMOVE_USER_CLOSET_ITEM_REQUEST,
      });

      const result = await deleteUserClosetItem(
        userId,
        closetId,
        itemId,
        config,
      );

      dispatch({
        type: actionTypes.REMOVE_USER_CLOSET_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.REMOVE_USER_CLOSET_ITEM_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default removeUserClosetItemFactory;
