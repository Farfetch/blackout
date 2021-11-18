import * as actionTypes from '../actionTypes';
import { buildContentGroupHash } from '../../utils';
import { normalize } from 'normalizr';
import contentGroup from '../../../entities/schemas/contentGroup';

/**
 * @typedef {object} GetContentQuery
 * @property {string} spaceCode - The space where the content belongs to (website|mobileapp|emailTool...).
 * @property {string} environmentCode - The environment identifier (live | preview).
 * @property {string} contentTypeCode - The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
 * @property {Array}  codes - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @property {object} target - The targets and respective values that a content type is configured (contentzone:ROW | country:GB | language:en-GB | benefits:test).
 * @property {string} [sort] - Sort content by (publicationDate:desc | publicationDate:asc | metadataCustom.eventDate:desc | metadataCustom.X:asc).
 * @property {number} [page=1] - Number of the page to get, starting at 1. The default is 1.
 * @property {number} [pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 */

/**
 * @callback GetContentThunkFactory
 * @param {GetContentQuery} query - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load contents for a specific query object received.
 *
 * @function doGetContent
 * @memberof module:contents/actions
 *
 * @param {Function} getContent - Get content client.
 *
 * @returns {GetContentThunkFactory} Thunk factory.
 */
export default getContent => (query, config) => async dispatch => {
  // Aggregate contents received by contentGroup with a hash representing the query object received.
  const hash = buildContentGroupHash(query);

  dispatch({
    meta: { query },
    payload: { hash },
    type: actionTypes.GET_CONTENT_REQUEST,
  });

  try {
    const result = await getContent(query, config);

    dispatch({
      meta: { query },
      payload: { ...normalize({ hash, ...result }, contentGroup), hash },
      type: actionTypes.GET_CONTENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { query },
      payload: { error, hash },
      type: actionTypes.GET_CONTENT_FAILURE,
    });

    throw error;
  }
};
