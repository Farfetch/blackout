import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type PostUserPersonalIdImage,
  type PostUserPersonalIdImageData,
  toBlackoutError,
  type User,
  type UserPersonalIdImage,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Method responsible for creating a personal id image.
 *
 * @param postUserPersonalIdImage - Post user attribute client.
 *
 * @returns Thunk factory.
 */
const createUserPersonalIdImageFactory =
  (postUserPersonalIdImage: PostUserPersonalIdImage) =>
  (userId: User['id'], data: PostUserPersonalIdImageData, config: Config) =>
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_USER_PERSONAL_ID_IMAGE_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createUserPersonalIdImageFactory;
