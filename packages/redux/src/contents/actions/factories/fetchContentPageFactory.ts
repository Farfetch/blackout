import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type ContentPage,
  type ContentPageType,
  type GetContentPage,
  type QueryContentPage,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { contentEntries } from '../../../entities/schemas/content';
import { ContentTypeCode, type FetchContentPageAction } from '../../types';
import { generateContentHash } from '../../utils';
import { normalize } from 'normalizr';
import type { Dispatch } from 'redux';

/**
 * Fetch ranked content page for a specific slug and strategy object received.
 *
 * @param getContentPage - Get content pages client.
 *
 * @returns Thunk factory.
 */
const fetchContentPageFactory =
  (getContentPage: GetContentPage) =>
  (
    contentPagesType: ContentPageType,
    query: QueryContentPage,
    config?: Config,
  ) =>
  async (dispatch: Dispatch<FetchContentPageAction>): Promise<ContentPage> => {
    const { slug } = query;

    const hash = generateContentHash({
      contentTypeCode: ContentTypeCode.ContentPage,
      codes: slug,
    });

    dispatch({
      payload: { hash },
      type: actionTypes.FETCH_CONTENT_PAGES_REQUEST,
    });

    try {
      const result = await getContentPage(contentPagesType, query, config);

      dispatch({
        payload: {
          ...normalize({ hash, ...result }, contentEntries),
          hash,
        },
        type: actionTypes.FETCH_CONTENT_PAGES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError, hash },
        type: actionTypes.FETCH_CONTENT_PAGES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchContentPageFactory;
