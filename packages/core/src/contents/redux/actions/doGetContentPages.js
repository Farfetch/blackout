import * as actionTypes from '../actionTypes';
import { buildContentGroupHash } from '../../utils';
import { normalize } from 'normalizr';
import contentGroup from '../../../entities/schemas/contentGroup';

/**
 * @enum {ContentType}
 */
let ContentType = 'PRODUCT' | 'LISTING' | 'SET';

/**
 * @callback GetContentPagesThunkFactory
 * @param {string} slug - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {ContentType} contentType -  Query by a page type (E.g. PRODUCT, LISTING, SET).
 * @param {string} [strategy] - Strategy to get best ranking content page.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load a content page ranked for a specific query object received.
 *
 * @function doGetContentPages
 * @memberof module:contents/actions
 *
 * @param {Function} getContentPages - Get content pages client.
 *
 * @returns {GetContentPagesThunkFactory} Thunk factory.
 */
export default getContentPages =>
  (slug, contentType, strategy, config) =>
  async dispatch => {
    const hash = buildContentGroupHash({
      contentTypeCode: 'content_pages',
      codes: slug.split('?')[0],
    });

    const query = {
      slug: slug,
      strategy: strategy,
    };

    dispatch({
      meta: { query },
      payload: { hash },
      type: actionTypes.GET_CONTENT_PAGES_REQUEST,
    });

    try {
      const result = await getContentPages(contentType, query, config);

      dispatch({
        meta: { query },
        payload: {
          ...normalize({ hash, ...result }, contentGroup),
          hash,
        },
        type: actionTypes.GET_CONTENT_PAGES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { query },
        payload: { error, hash },
        type: actionTypes.GET_CONTENT_PAGES_FAILURE,
      });

      throw error;
    }
  };
