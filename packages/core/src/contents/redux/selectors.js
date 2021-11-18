/**
 * Contents selectors.
 *
 * @module contents/selectors
 * @category Contents
 * @subcategory Selectors
 */

import { buildContentGroupHash, buildSEOPathname } from '../utils';
import { getContent, getContentGroup } from '../../entities/redux/selectors';
import {
  getContentType,
  getError,
  getIsLoading,
  getSEOmetadata,
} from './reducer';

/**
 * Returns the error thrown by the getContent request, by query.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {?object} - Content error.
 * @example
 * import { getContentError } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *   error: getContentError(state, query)
 * });
 */
export const getContentError = (state, query) => {
  const hash = buildContentGroupHash(query);

  return getError(state.contents)[hash];
};

/**
 * Returns the loading condition to the getContent request, by query.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {boolean} - If the content is loading or not.
 * @example
 * import { isContentLoading } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *   isLoading: isContentLoading(state, query)
 * });
 */
export const isContentLoading = (state, query) => {
  const hash = buildContentGroupHash(query);

  return getIsLoading(state.contents)[hash];
};

/**
 * Returns the contentGroup corresponding to a specific query.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {object} - Content group that aggregates all contents for the query received.
 *
 * @example
 * import { getContentGroupByQuery } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *   contentGroup: getContentGroupByQuery(state, query)
 * });
 *
 */
export const getContentGroupByQuery = (state, query) => {
  const hash = buildContentGroupHash(query);

  return getContentGroup(state, hash);
};

/**
 * Returns the contents from a certain contentGroup retrieved by its query/hash.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search the contents.
 *
 * @returns {Array} - All the contents for the given contentGroup.
 *
 * @example
 * import { getContents } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *   contents: getContents(state, query)
 * });
 *
 */
export const getContents = (state, query) => {
  const result = getContentGroupByQuery(state, query);

  return (
    result && result.entries.map(contentId => getContent(state, contentId))
  );
};

/**
 * Returns an array will the content types available.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - All the content types.
 *
 * @example
 * import { getContentTypes } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = state => ({
 *    contentTypes: getContentTypes(state)
 * });
 */
export const getAllContentTypes = state => getContentType(state.contents);

/**
 * Returns the error thrown to the getSEO request.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search for metadata.
 *
 * @returns {?object} - Content error.
 *
 * @example
 * import { getSEOError } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *   seoError: getSEOError(state, query)
 * });
 *
 */
export const getSEOError = (state, query) => {
  const pathname = buildSEOPathname(query);

  return getSEOmetadata(state.contents).error[pathname];
};

/**
 * Returns the loading status to the getSEO request.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search for metadata.
 *
 * @returns {boolean} - If the content is loading or not.
 *
 * @example
 * import { isSEOLoading } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *   isSEOLoading: isSEOLoading(state, query)
 * });
 *
 */
export const isSEOLoading = (state, query) => {
  const pathname = buildSEOPathname(query);

  return getSEOmetadata(state.contents).isLoading[pathname];
};

/**
 * Returns the metadata content of that page.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {object} query - Query applied to search for the metadata.
 *
 * @returns {object} - All metadata for that page.
 *
 * @example
 * import { getSEO } from '@farfetch/blackout-core/contents/redux';
 *
 * const mapStateToProps = (state, { query }) => ({
 *   seo: getSEO(state, query)
 * });
 *
 */
export const getSEO = (state, query) => {
  const pathname = buildSEOPathname(query);
  const result = getSEOmetadata(state.contents).result;

  return result && result[pathname];
};
