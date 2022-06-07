import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSEOMetadata,
  GetSEOMetadataQuery,
  SEOMetadata,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSEOPathname } from '../../utils';
import type { Dispatch } from 'redux';
import type { FetchSEOMetadataAction } from '../../types';

/**
 * Fetch SEO metadata content with a specific query object.
 *
 * @param getSEOMetadata - Get SEO metadata client.
 *
 * @returns Thunk factory.
 */
const fetchSEOMetadataFactory =
  (getSEOMetadata: GetSEOMetadata) =>
  (query: GetSEOMetadataQuery, config?: Config) =>
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
      dispatch({
        payload: {
          error: toBlackoutError(error),
          pathname,
        },
        type: actionTypes.FETCH_SEO_METADATA_FAILURE,
      });

      throw error;
    }
  };

export default fetchSEOMetadataFactory;
