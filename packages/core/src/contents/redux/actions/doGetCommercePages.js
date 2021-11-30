import * as actionTypes from '../actionTypes';
import {
  buildContentGroupHash,
  GENDER,
  getRankedCommercePage,
  PRICETYPE,
} from '../../utils';
import { normalize } from 'normalizr';
import contentGroup from '../../../entities/schemas/contentGroup';

/**
 * @typedef {string} Type
 * @typedef {number} Gender
 * @typedef {string} PriceType
 */

/**
 * @enum {Type}
 * @enum {Gender}
 * @enum {PriceType}
 */
let Type = 'Product' | 'Listing' | 'Set';
let Gender = GENDER;
let PriceType = PRICETYPE;

/**
 * @typedef {object} GetCommercePagesQuery
 * @property {Type}      type - Query by a page type (E.g. Product, Listing, Set).
 * @property {number}    [id] - Query by a specified product or set identifier.
 * @property {Gender}    [gender] - Query by a gender (E.g. 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid).
 * @property {number}    [brand] - Query by a specified brand identifier.
 * @property {string}    [category] - Query by a specified category identifiers, separated by commas
 * (E.g. 139065,139088).
 * @property {PriceType} [priceType] - Query by a specified price type, separated by commas (E.g. 0 = Full
 * Price, 1 = Sale, 2 = PrivateSale).
 * @property {number}    [sku] - Query by a specified sku identifier.
 * @property {number}    [pageIndex] - Number of the page to get, starting at 1. The default is 1.
 * @property {number}    [pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 */

/**
 * @callback GetCommercePagesThunkFactory
 * @param {GetCommercePagesQuery} query - Query object with commerce pages parameters to apply.
 * @param {string} slug - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {string} [strategy] - String with the selected strategy for commerce pages.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load commerce pages for a specific query object received.
 *
 * @function doGetCommercePages
 * @memberof module:contents/actions
 *
 * @param {Function} getCommercePages - Get commerce pages client.
 *
 * @returns {GetCommercePagesThunkFactory} Thunk factory.
 */
export default getCommercePages =>
  (query, slug, strategy, config) =>
  async dispatch => {
    const hash = buildContentGroupHash({
      contentTypeCode: 'commerce_pages',
      codes: slug,
      pageSize: query?.pageSize,
    });

    dispatch({
      meta: { query },
      payload: { hash },
      type: actionTypes.GET_COMMERCE_PAGES_REQUEST,
    });

    try {
      const result = await getCommercePages(query, config);
      const rankedResult = getRankedCommercePage(result, strategy);

      dispatch({
        meta: { query },
        payload: {
          ...normalize({ hash, ...rankedResult }, contentGroup),
          hash,
        },
        type: actionTypes.GET_COMMERCE_PAGES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error, hash },
        type: actionTypes.GET_COMMERCE_PAGES_FAILURE,
      });

      throw error;
    }
  };
