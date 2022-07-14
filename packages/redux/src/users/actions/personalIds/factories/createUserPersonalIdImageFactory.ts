import * as actionTypes from '../../../actionTypes';
import { Config, toBlackoutError } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type {
  PostUserPersonalIdImage,
  PostUserPersonalIdImageData,
  PostUserPersonalIdImageResponse,
} from '@farfetch/blackout-client/src/users/personalIds/types';

/**
 * @param userId - User id.
 * @param data   - Personal id image object.
 * @param config - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                 header is required.
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating a personal id image.
 *
 * @param postUserPersonalIdImage - Post user attribute client.
 *
 * @returns Thunk factory.
 */
export const createUserPersonalIdImageFactory =
  (postUserPersonalIdImage: PostUserPersonalIdImage) =>
  (userId: number, data: PostUserPersonalIdImageData, config: Config) =>
  async (dispatch: Dispatch): Promise<PostUserPersonalIdImageResponse> => {
    try {
      dispatch({
        type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_REQUEST,
      });

      const result = await postUserPersonalIdImage(userId, data, config);

      dispatch({
        type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_SUCCESS,
        payload: result,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_FAILURE,
      });

      throw error;
    }
  };
