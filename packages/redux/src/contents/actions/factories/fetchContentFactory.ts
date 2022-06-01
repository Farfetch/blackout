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
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch contents for a specific query object received.
 *
 * @param getContent - Get content client.
 *
 * @returns Thunk factory.
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
