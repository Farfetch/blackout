import * as actionTypes from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  ContentTypes,
  ContentTypesEntries,
  GetContentTypes,
} from '@farfetch/blackout-client/contents/types';
import type { Dispatch } from 'redux';

/**
 * @callback FetchContentTypesThunkFactory
 * @param {string} spaceCode - The space where the content belongs to (website|mobileapp|emailTool...).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch content types.
 *
 * @function fetchContentTypesFactory
 * @memberof module:contents/actions/factories
 *
 * @param {Function} getContentTypes - Fetch content types client.
 *
 * @returns {FetchContentTypesThunkFactory} Thunk factory.
 */
export default (getContentTypes: GetContentTypes) =>
  (spaceCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<ContentTypes> => {
    dispatch({
      type: actionTypes.FETCH_CONTENT_TYPES_REQUEST,
    });

    try {
      const contentTypes = await getContentTypes(spaceCode, config);

      dispatch({
        payload: contentTypes.entries.map(
          (entry: ContentTypesEntries) => entry.code,
        ),
        type: actionTypes.FETCH_CONTENT_TYPES_SUCCESS,
      });

      return contentTypes;
    } catch (error) {
      dispatch({
        payload: { error },
        type: actionTypes.FETCH_CONTENT_TYPES_FAILURE,
      });

      throw error;
    }
  };
