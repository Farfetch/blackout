import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostUserPersonalIdImage,
  PostUserPersonalIdImageData,
  toBlackoutError,
  UserPersonalIdImage,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

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
  async (dispatch: Dispatch): Promise<UserPersonalIdImage> => {
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
