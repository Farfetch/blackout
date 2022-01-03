import * as actionTypes from '../../actionTypes';
import { contentEntries } from '../../../entities/schemas/content';
import { generateContentHash, getRankedCommercePage } from '../../utils';
import { normalize } from 'normalizr';
import type {
  ActionFetchCommercePages,
  CommercePagesContentNormalized,
} from '../../types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCommercePages,
  QueryCommercePages,
} from '@farfetch/blackout-client/contents/types';

/**
 * @typedef {object} FetchCommercePagesQuery
 * @property {string} type - Query by a page type (E.g. PRODUCT, LISTING, SET).
 * @property {number} [id] - Query by a specified product or set identifier.
 * @property {number} [gender] - Query by a gender (E.g. 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid).
 * @property {number} [brand] - Query by a specified brand identifier.
 * @property {string} [category] - Query by a specified category identifiers, separated by commas
 * (E.g. 139065,139088).
 * @property {number} [priceType] - Query by a specified price type, separated by commas (E.g. 0 = Full
 * Price, 1 = Sale, 2 = PrivateSale).
 * @property {number} [sku] - Query by a specified sku identifier.
 * @property {number} [pageIndex] - Number of the page to get, starting at 1. The default is 1.
 * @property {number} [pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 */

/**
 * @callback FetchCommercePagesThunkFactory
 * @param {FetchCommercePagesQuery} query - Query object with search terms to apply.
 * @param {string} slug - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {string} [strategy] - String with the selected strategy for commerce pages.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch commerce pages for a specific query object received.
 *
 * @function FetchCommercePagesFactory
 * @memberof module:contents/actions/factories
 *
 * @param {Function} getCommercePages - Get commerce pages client.
 *
 * @returns {FetchCommercePagesThunkFactory} Thunk factory.
 */
export default (getCommercePages: GetCommercePages) =>
  (
    query: QueryCommercePages,
    slug: string,
    strategy?: string,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<ActionFetchCommercePages>,
  ): Promise<CommercePagesContentNormalized> => {
    const hash = generateContentHash({
      contentTypeCode: 'commerce_pages',
      codes: slug,
      pageSize: query?.pageSize,
    });

    dispatch({
      meta: { query },
      payload: { hash },
      type: actionTypes.FETCH_COMMERCE_PAGES_REQUEST,
    });

    try {
      const result = await getCommercePages(query, config);
      const normalizedResult = {
        number: 1,
        totalItems: 1,
        totalPages: 1,
        entries: result,
      };
      const rankedResult = getRankedCommercePage(normalizedResult, strategy);

      dispatch({
        meta: { query },
        payload: {
          ...normalize({ hash, ...rankedResult }, contentEntries),
          hash,
        },
        type: actionTypes.FETCH_COMMERCE_PAGES_SUCCESS,
      });

      return normalizedResult;
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error, hash },
        type: actionTypes.FETCH_COMMERCE_PAGES_FAILURE,
      });

      throw error;
    }
  };
