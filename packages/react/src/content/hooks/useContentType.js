import {
  doGetContent,
  getContentError,
  getContents,
  isContentLoading,
} from '@farfetch/blackout-core/contents/redux';
import { getSearchContents as getContentClient } from '@farfetch/blackout-core/contents/client';
import { useAction } from '../../utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Hook to return actions and selectors for custom content type data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useContenType
 * @memberof module:content/hooks
 *
 * @param {string | string[]} codes - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {string} contentTypeCode - The custom content type unique code (e.g. 'careers').
 * @param {object} params - The target parameters that a content page is configured.
 * @param {string} [params.environmentcode] - Query a content by a specific environmentcode (environmentcode:live|preview).
 * @param {string} params.countryCode - Query a content by a specific country (country:GB).
 * @param {string} params.cultureCode - Query a content by a specific language (language:en-GB).
 * @param {string} [params.benefits] - Query a content by is benefits (benefits:test).
 * @param {string} [params.contentzone] - Query a content by a specific content zone (contentzone:ROW).
 * @param {string} [params.preview] - Query a content by a specific target preview guid.
 * @param {number} [pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns {object} - Returns actions and selectors for custom content type data.
 */
export default (codes, contentTypeCode, params, pageSize) => {
  const query = {
    ...(codes && { codes }),
    contentTypeCode,
    environmentCode:
      params?.environmentcode || process.env.WEB_APP_CONTENT_ENV || '',
    'target.country': params?.countryCode,
    'target.language': params?.cultureCode,
    'target.benefits': params?.benefits,
    'target.contentzone': params?.contentzone,
    'target.preview': params?.preview,
    pageSize,
  };
  const contentTypeError = useSelector(state => getContentError(state, query));
  const isContentTypeLoading = useSelector(state =>
    isContentLoading(state, query),
  );
  const contentType = useSelector(state => getContents(state, query));
  const action = useAction(doGetContent(getContentClient));
  const fetchContentType = () => action(query);

  useEffect(() => {
    !contentType && fetchContentType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, codes, contentTypeCode]);

  return {
    /**
     * Get the result for a specific Custom content type.
     *
     * @type {object[]}
     */
    contentType,
    /**
     * Loading state for a specific Navigation content.
     *
     * @type {object}
     */
    isContentTypeLoading,
    /**
     * Error state for a specific Navigation content.
     *
     * @type {object}
     */
    contentTypeError,
    /**
     * Fetch custom content type editorial data.
     *
     * @type {Function}
     */
    fetchContentType,
  };
};
