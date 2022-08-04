import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetCommercePages,
  QueryCommercePages,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { contentEntries } from '../../../entities/schemas/content';
import { generateContentHash, getRankedCommercePage } from '../../utils';
import { normalize } from 'normalizr';
import type {
  ActionFetchCommercePages,
  CommercePagesContentNormalized,
} from '../../types';
import type { Dispatch } from 'redux';

/**
 * Fetch commerce pages for a specific query object received.
 *
 * @param getCommercePages - Get commerce pages client.
 *
 * @returns Thunk factory.
 */
const fetchCommercePagesFactory =
  (getCommercePages: GetCommercePages) =>
  (
    query: QueryCommercePages,
    slug: string,
    strategy?: string,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<ActionFetchCommercePages>,
  ): Promise<CommercePagesContentNormalized> => {
    let hash: string | undefined = undefined;
    try {
      hash = generateContentHash({
        contentTypeCode: 'commerce_pages',
        codes: slug,
        pageSize: query?.pageSize,
      });

      dispatch({
        meta: { query },
        payload: { hash },
        type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
      });

      const result = await getCommercePages(query, config);
      const rankedResult = getRankedCommercePage(result, strategy);

      dispatch({
        meta: { query },
        payload: {
          ...normalize({ hash, ...rankedResult }, contentEntries),
          hash,
        },
        type: actionTypes.FETCH_COMMERCE_PAGES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error: toBlackoutError(error), hash: hash as string },
        type: actionTypes.FETCH_COMMERCE_PAGES_FAILURE,
      });

      throw error;
    }
  };

export default fetchCommercePagesFactory;
