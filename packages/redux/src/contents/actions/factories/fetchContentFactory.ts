import * as actionTypes from '../../actionTypes';
import { contentEntries } from '../../../entities/schemas/content';
import { generateContentHash } from '../../utils';
import { normalize } from 'normalizr';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  Contents,
  GetContent,
  QueryContents,
} from '@farfetch/blackout-client/contents/types';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} FetchContentQuery
 * @property {string} spaceCode - The space where the content belongs to (website|mobileapp|emailTool...).
 * @property {string} environmentCode - The environment identifier (live | preview).
 * @property {string} contentTypeCode - The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
 * @property {string | string[]} codes - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @property {object} target - The targets and respective values that a content type is configured (contentzone:ROW | country:GB | language:en-GB | benefits:test).
 * @property {string} [sort] - Sort content by (publicationDate:desc | publicationDate:asc | metadataCustom.eventDate:desc | metadataCustom.X:asc).
 * @property {number} [page=1] - Number of the page to get, starting at 1. The default is 1.
 * @property {number} [pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 */

/**
 * @callback FetchContentThunkFactory
 * @param {FetchContentQuery} query - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch contents for a specific query object received.
 *
 * @function FetchContentFactory
 * @memberof module:contents/actions/factories
 *
 * @param {Function} getContent - Get content client.
 *
 * @returns {FetchContentThunkFactory} Thunk factory.
 */
export default (getContent: GetContent) =>
  (query: QueryContents, config?: Config) =>
  async (dispatch: Dispatch): Promise<Contents> => {
    // Aggregate contents with a hash representing the query object received.
    const hash = generateContentHash(query);

    dispatch({
      meta: { query },
      payload: { hash },
      type: actionTypes.FETCH_CONTENT_REQUEST,
    });

    try {
      const result = await getContent(query, config);

      dispatch({
        meta: { query },
        payload: {
          ...normalize({ hash, ...result }, contentEntries),
          hash,
        },
        type: actionTypes.FETCH_CONTENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error, hash },
        type: actionTypes.FETCH_CONTENT_FAILURE,
      });

      throw error;
    }
  };
