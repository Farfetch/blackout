import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type ContentPage,
  type ContentPageType,
  type GetContentPage,
  type QueryContentPage,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { contentEntries } from '../../../entities/schemas/content.js';
import {
  ContentTypeCode,
  type FetchContentPageAction,
} from '../../types/index.js';
import { generateContentHash } from '../../utils.js';
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
    contentPageType: ContentPageType,
    query: QueryContentPage,
    config?: Config,
  ) =>
  async (dispatch: Dispatch<FetchContentPageAction>): Promise<ContentPage> => {
    const { slug } = query;
    const slugWithoutQueryString = slug.split('?')[0] as string;

    const hash = generateContentHash({
      contentTypeCode: ContentTypeCode.ContentPage,
      codes: slugWithoutQueryString,
    });

    dispatch({
      payload: { hash },
      type: actionTypes.FETCH_CONTENT_PAGE_REQUEST,
    });

    try {
      const result = await getContentPage(
        contentPageType,
        { ...query, slug: slugWithoutQueryString },
        config,
      );

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
