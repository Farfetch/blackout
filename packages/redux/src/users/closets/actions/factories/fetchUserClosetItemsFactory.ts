import * as actionTypes from '../../../actionTypes.js';
import {
  type Closet,
  type ClosetItems,
  type Config,
  type GetUserClosetItems,
  type GetUserClosetItemsQuery,
  toBlackoutError,
  type User,
} from '@farfetch/blackout-client';
import adaptProductImages from '../../../../helpers/adapters/adaptProductImages.js';
import type { Dispatch } from 'redux';
import type { FetchUserClosetItemsAction } from '../../types/actions.types.js';
import type {
  GetOptionsArgument,
  StoreState,
} from '../../../../types/index.js';

/**
 * Method responsible for fetching the items (paginated) from a specific closet.
 *
 * @param getUserClosetItems - Get user closet items client.
 *
 * @returns Thunk factory.
 */
const fetchUserClosetItemsFactory =
  (getUserClosetItems: GetUserClosetItems) =>
  (
    userId: User['id'],
    closetId: Closet['id'],
    query?: GetUserClosetItemsQuery,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchUserClosetItemsAction>,
    getState: () => StoreState,
    {
      getOptions = arg => ({ productImgQueryParam: arg.productImgQueryParam }),
    }: GetOptionsArgument,
  ): Promise<ClosetItems> => {
    try {
      dispatch({
        type: actionTypes.FETCH_USER_CLOSET_ITEMS_REQUEST,
      });

      const { productImgQueryParam } = getOptions(getState);
      const result = await getUserClosetItems(userId, closetId, query, config);

      const adaptedResult = {
        ...result,
        entries: result.entries.map(item => ({
          ...item,
          images: adaptProductImages(item.images.images, {
            productImgQueryParam,
          }),
        })),
      };

      dispatch({
        type: actionTypes.FETCH_USER_CLOSET_ITEMS_SUCCESS,
        payload: adaptedResult,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_USER_CLOSET_ITEMS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchUserClosetItemsFactory;
