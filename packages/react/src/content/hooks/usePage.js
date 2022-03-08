import {
  doGetContent,
  getContentError,
  getContents,
  isContentLoading,
  resetContents,
} from '@farfetch/blackout-core/contents/redux';
import { getSearchContents as getContentClient } from '@farfetch/blackout-core/contents/client';
import { useAction } from '../../utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Hook to return actions and selectors for content page data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function usePage
 * @memberof module:content/hooks
 *
 * @param {string} slug - Slug of the page to fetch for data.
 * @param {object} params - The target parameters that a content page is configured.
 * @param {string} params.countryCode - Query a content by a specific country (country:GB).
 * @param {string} params.cultureCode - Query a content by a specific language (language:en-GB).
 * @param {string} [params.benefits] - Query a content by is benefits (benefits:test).
 * @param {string} [params.contentzone] - Query a content by a specific content zone (contentzone:ROW).
 * @param {string} [params.spaceCode] - The space where the content belongs to (website|mobileapp|emailTool...).
 * @param {number} [pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns {object} - Returns actions and selectors for content page data.
 */
export default (slug, params, pageSize) => {
  const query = {
    codes: slug,
    contentTypeCode: 'pages',
    environmentCode: process.env.WEB_APP_CONTENT_ENV || '',
    spaceCode: params?.spaceCode,
    'target.country': params?.countryCode,
    'target.language': params?.cultureCode,
    'target.benefits': params?.benefits,
    'target.contentzone': params?.contentzone,
    pageSize,
  };
  const error = useSelector(state => getContentError(state, query));
  const isLoading = useSelector(state => isContentLoading(state, query));
  const page = useSelector(state => getContents(state, query));
  const action = useAction(doGetContent(getContentClient));
  const fetchContent = () => action(query);
  const resetContent = useAction(resetContents);

  useEffect(() => {
    !page && fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slug]);

  return {
    /**
     * Get the result for a specific Page.
     *
     * @type {object[]}
     */
    page,
    /**
     * Reset contents.
     *
     * @type {object}
     */
    resetContent,
    /**
     * Loading state for a specific Page.
     *
     * @type {object}
     */
    isLoading,
    /**
     * Error state for a specific Page.
     *
     * @type {object}
     */
    error,
    /**
     * Fetch Page content for a specific slug.
     *
     * @type {Function}
     */
    fetchContent,
  };
};
