import * as actionTypes from '../../actionTypes.js';

import {
  type Config,
  type GetSEOFiles,
  type GetSEOFilesQuery,
  type SEOFiles,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSEOFilesHash } from '../../utils.js';
import type { Dispatch } from 'redux';
import type { FetchSEOFilesAction } from '../../types/index.js';

/**
 * Fetch SEO files with a specific query object.
 *
 * @param getSEOFiles - Get SEO files client.
 *
 * @returns Thunk factory.
 */
const fetchSEOFilesFactory =
  (getSEOFiles: GetSEOFiles) =>
  (query: GetSEOFilesQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchSEOFilesAction>): Promise<SEOFiles> => {
    let hash = '';

    try {
      hash = generateSEOFilesHash(query);

      dispatch({
        payload: { hash },
        type: actionTypes.FETCH_SEO_FILES_REQUEST,
      });

      const result = await getSEOFiles(query, config);

      dispatch({
        payload: { hash, result },
        type: actionTypes.FETCH_SEO_FILES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: {
          error: errorAsBlackoutError,
          hash,
        },
        type: actionTypes.FETCH_SEO_FILES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchSEOFilesFactory;
