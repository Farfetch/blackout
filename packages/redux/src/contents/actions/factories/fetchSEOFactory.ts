import {
  FETCH_SEO_FAILURE,
  FETCH_SEO_REQUEST,
  FETCH_SEO_SUCCESS,
} from '../../actionTypes';
import { generateSEOPathname } from '../../utils';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { ActionFetchSEO } from '../../types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetSEO,
  QuerySEO,
  SEOMetadata,
} from '@farfetch/blackout-client/contents/types';
import type { Nullable } from '@farfetch/blackout-redux/types';

/**
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch SEO metadata content with a specific query object.
 *
 * @param getSEO - Get SEO client.
 *
 * @returns Thunk factory.
 */
export default (getSEO: GetSEO) =>
  (query: QuerySEO, config?: Config) =>
  async (dispatch: Dispatch<ActionFetchSEO>): Promise<SEOMetadata> => {
    let pathname: Nullable<string> = null;

    try {
      pathname = generateSEOPathname(query);

      dispatch({
        meta: { query },
        payload: { pathname },
        type: FETCH_SEO_REQUEST,
      });

      const result = await getSEO(query, config);

      dispatch({
        meta: { query },
        payload: { pathname, result },
        type: FETCH_SEO_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error: toError(error), pathname: pathname as string },
        type: FETCH_SEO_FAILURE,
      });

      throw error;
    }
  };
