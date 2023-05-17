import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetSEOMetadata,
  type GetSEOMetadataQuery,
  type SEOMetadata,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSEOPathname } from '../../utils.js';
import type { Dispatch } from 'redux';
import type { FetchSEOMetadataAction } from '../../types/index.js';

/**
 * Fetch SEO metadata content with a specific query object.
 *
 * @param getSEOMetadata - Get SEO metadata client.
 *
 * @returns Thunk factory.
 */
const fetchSEOMetadataFactory =
  (getSEOMetadata: GetSEOMetadata) =>
  (query?: GetSEOMetadataQuery, config?: Config) =>
  async (dispatch: Dispatch<FetchSEOMetadataAction>): Promise<SEOMetadata> => {
    let pathname = '';

    try {
      pathname = generateSEOPathname(query);

      dispatch({
        payload: { pathname },
        type: actionTypes.FETCH_SEO_METADATA_REQUEST,
      });

      const result = await getSEOMetadata(query, config);

      dispatch({
        payload: { pathname, result },
        type: actionTypes.FETCH_SEO_METADATA_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: {
          error: errorAsBlackoutError,
          pathname,
        },
        type: actionTypes.FETCH_SEO_METADATA_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchSEOMetadataFactory;
