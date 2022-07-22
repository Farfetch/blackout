import {
  doGetContentPages,
  getContentError,
  getContents,
  isContentLoading,
  resetContents,
} from '@farfetch/blackout-core/contents/redux';
import { getContentPages } from '@farfetch/blackout-core/contents/client';
import { useAction } from '../../utils';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * @enum {ContentType}
 */
let ContentType = 'PRODUCT' | 'LISTING' | 'SET';

/**
 * Hook to return actions and selectors for Content page data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useContentPage
 * @memberof module:content/hooks
 *
 * @param {string} slug - Slug of the content page to fetch for data.
 * @param {ContentType} contentType - Query by a page type (E.g. PRODUCT, LISTING, SET).
 * @param {string} [strategy] - Strategy to get best ranking content page.
 *
 * @returns {object} - Returns actions and selectors for content page data.
 */
export default (slug, contentType, strategy = 'default') => {
  const queryContent = useMemo(() => {
    if (!slug) {
      return null;
    }

    return {
      codes: slug.split('?')[0],
      contentTypeCode: 'content_pages',
    };
  }, [slug]);

  const error = useSelector(state => getContentError(state, queryContent));
  const isLoading = useSelector(state => isContentLoading(state, queryContent));
  const contentPage = useSelector(state => getContents(state, queryContent));
  const action = useAction(doGetContentPages(getContentPages));
  const resetContent = useAction(resetContents);

  const fetchContent = useCallback(() => {
    return action(slug, contentType, strategy);
  }, [action, slug, contentType, strategy]);

  useEffect(() => {
    !contentPage && fetchContent();
  }, [contentPage, slug, fetchContent]);

  return {
    /**
     * Get the result for a specific Content Page.
     *
     * @type {object[]}
     */
    contentPage,
    /**
     * Reset contents.
     *
     * @type {object}
     */
    resetContent,
    /**
     * Loading state for a specific Content Page.
     *
     * @type {object}
     */
    isLoading,
    /**
     * Error state for a specific Content Page.
     *
     * @type {object}
     */
    error,
    /**
     * Fetch Content Page content for a specific slug.
     *
     * @type {Function}
     */
    fetchContent,
  };
};
