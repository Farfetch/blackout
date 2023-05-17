import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type ContentType,
  type ContentTypes,
  type GetContentTypes,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';

/**
 * Fetch content types.
 *
 * @param getContentTypes - Fetch content types client.
 *
 * @returns Thunk factory.
 */
const fetchContentTypesFactory =
  (getContentTypes: GetContentTypes) =>
  (spaceCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<ContentTypes> => {
    try {
      dispatch({
        type: actionTypes.FETCH_CONTENT_TYPES_REQUEST,
      });

      const contentTypes = await getContentTypes(spaceCode, config);

      dispatch({
        payload: contentTypes.entries.map((entry: ContentType) => entry.code),
        type: actionTypes.FETCH_CONTENT_TYPES_SUCCESS,
      });

      return contentTypes;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_CONTENT_TYPES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchContentTypesFactory;
