import * as actionTypes from '../../actionTypes';
import {
  Config,
  Contents,
  GetSearchContents,
  QuerySearchContents,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { contentEntries } from '../../../entities/schemas/content';
import { generateContentHash } from '../../utils';
import { normalize } from 'normalizr';
import type { Dispatch } from 'redux';
import type { FetchContentsAction } from '../../types';

/**
 * Fetch contents for a specific query object received.
 *
 * @param getSearchContents - Get search contents client.
 *
 * @returns Thunk factory.
 */
const fetchContentsFactory =
  (getContent: GetSearchContents) =>
  (query: QuerySearchContents, config?: Config) =>
  async (dispatch: Dispatch<FetchContentsAction>): Promise<Contents> => {
    let hash: string | undefined = undefined;

    try {
      // Aggregate contents with a hash representing the query object received.
      hash = generateContentHash(query);

      dispatch({
        payload: { hash },
        type: actionTypes.FETCH_CONTENTS_REQUEST,
      });

      const result = await getContent(query, config);

      dispatch({
        payload: {
          ...normalize({ hash, ...result }, contentEntries),
          hash,
        },
        type: actionTypes.FETCH_CONTENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError, hash: hash as string },
        type: actionTypes.FETCH_CONTENTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchContentsFactory;
