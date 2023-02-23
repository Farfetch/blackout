import * as actionTypes from '../../actionTypes';
import {
  type CommercePages,
  type CommercePagesStrategy,
  type Config,
  type GetCommercePages,
  type QueryCommercePages,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { contentEntries } from '../../../entities/schemas/content';
import { ContentTypeCode, type FetchCommercePagesAction } from '../../types';
import { generateContentHash, getRankedCommercePage } from '../../utils';
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
    query: QueryCommercePages,
    strategy?: CommercePagesStrategy,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchCommercePagesAction>,
  ): Promise<CommercePages> => {
    let hash: string | undefined;

    try {
      hash = generateContentHash({
        contentTypeCode: ContentTypeCode.CommercePages,
        ...query,
      });

      dispatch({
        payload: { hash },
        type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
      });

      const result = await getCommercePages(query, config);
      const rankedResult = getRankedCommercePage(result, strategy);

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
