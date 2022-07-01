import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetSEO,
  QuerySEO,
  SEOMetadata,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { generateSEOPathname } from '../../utils';
import type { ActionFetchSEO } from '../../types';
import type { Dispatch } from 'redux';
import type { Nullable } from '../../../types';

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
const fetchSEOFactory =
  (getSEO: GetSEO) =>
  (query: QuerySEO, config?: Config) =>
  async (dispatch: Dispatch<ActionFetchSEO>): Promise<SEOMetadata> => {
    let pathname: Nullable<string> = null;

    try {
      pathname = generateSEOPathname(query);

      dispatch({
        meta: { query },
        payload: { pathname },
        type: actionTypes.FETCH_SEO_REQUEST,
      });

      const result = await getSEO(query, config);

      dispatch({
        meta: { query },
        payload: { pathname, result },
        type: actionTypes.FETCH_SEO_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: {
          error: toBlackoutError(error),
          pathname: pathname as string,
        },
        type: actionTypes.FETCH_SEO_FAILURE,
      });

      throw error;
    }
  };

export default fetchSEOFactory;
