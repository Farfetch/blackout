import * as actionTypes from '../../actionTypes';
import { contentEntries } from '../../../entities/schemas/content';
import { generateContentHash } from '../../utils';
import { normalize } from 'normalizr';
import type {
  ActionFetchContentPages,
  ContentPagesContentNormalized,
} from '../../types';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  ContentType,
  GetContentPages,
} from '@farfetch/blackout-client/contents/types';
import type { Dispatch } from 'redux';

/**
 * @callback FetchContentPagesThunkFactory
 * @param {string} slug - String that representing the content code (/shopping/man|/shopping/:productId...).
 * @param {ContentType} contentType - Query by a page type (E.g. PRODUCT, LISTING, SET).
 * @param {string} [strategy] - Strategy to get best ranking content page.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch ranked content page for a specific slug and strategy object received.
 *
 * @function FetchContentPagesFactory
 * @memberof module:contents/actions/factories
 *
 * @param {Function} getContentPages - Get content pages client.
 *
 * @returns {FetchContentPagesThunkFactory} Thunk factory.
 */
export default (getContentPages: GetContentPages) =>
  (
    slug: string,
    contentType: ContentType,
    strategy?: string,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<ActionFetchContentPages>,
  ): Promise<ContentPagesContentNormalized> => {
    const hash = generateContentHash({
      contentTypeCode: 'content_pages',
      codes: slug,
    });

    const query = {
      slug: slug,
      strategy: strategy,
    };

    dispatch({
      meta: { query },
      payload: { hash },
      type: actionTypes.FETCH_CONTENT_PAGES_REQUEST,
    });

    try {
      const result = await getContentPages(contentType, query, config);

      dispatch({
        meta: { query },
        payload: {
          ...normalize({ hash, ...result }, contentEntries),
          hash,
        },
        type: actionTypes.FETCH_CONTENT_PAGES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error, hash },
        type: actionTypes.FETCH_CONTENT_PAGES_FAILURE,
      });

      throw error;
    }
  };
