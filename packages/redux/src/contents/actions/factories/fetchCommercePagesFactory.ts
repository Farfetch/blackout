import * as actionTypes from '../../actionTypes.js';
import {
  applyCommercePagesRankingStrategy,
  generateContentHash,
} from '../../utils.js';
import {
  type CommercePages,
  type Config,
  type GetCommercePages,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  type CommercePagesRankingStrategy,
  ContentTypeCode,
  type FetchCommercePagesAction,
  type QueryCommercePagesWithSlug,
} from '../../types/index.js';
import { contentEntries } from '../../../entities/schemas/content.js';
import { normalize } from 'normalizr';
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
    query: QueryCommercePagesWithSlug,
    strategy?: CommercePagesRankingStrategy,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchCommercePagesAction>,
  ): Promise<CommercePages> => {
    let hash: string | undefined;

    try {
      const { slug, ...queryWithoutSlug } = query;

      hash = generateContentHash({
        contentTypeCode: ContentTypeCode.CommercePages,
        codes: slug,
      });

      dispatch({
        payload: { hash },
        type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
      });

      const result = await getCommercePages(queryWithoutSlug, config);
      const rankedResult = applyCommercePagesRankingStrategy(result, strategy);

      dispatch({
        payload: {
          ...normalize({ hash, ...rankedResult }, contentEntries),
          hash,
        },
        type: actionTypes.FETCH_COMMERCE_PAGES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError, hash: hash as string },
        type: actionTypes.FETCH_COMMERCE_PAGES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchCommercePagesFactory;
