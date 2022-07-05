import {
  fetchContentPages as fetchContentPagesAction,
  getContentError,
  getContents,
  isContentLoading,
  resetContents as resetContentsAction,
} from '@farfetch/blackout-redux/contents';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { ContentType, UseContentPages } from '../types';
import type { StoreState } from '@farfetch/blackout-redux/types';

/**
 * Hook to return actions and selectors for Content page data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useContentPage
 * @memberof module:content/hooks
 *
 * @param {string} slug - Slug of the content page to fetch for data.
 * @param {ContentType} contentType - Query by a page type (E.g. PRODUCT, LISTING, SET).
 * @param {string} [strategy=default] - Strategy to get best ranking content page.
 *
 * @returns {object} - Returns actions and selectors for content page data.
 */
const useContentPages = (
  slug: string,
  contentType: ContentType,
  strategy = 'default',
): UseContentPages => {
  const queryContent = {
    codes: slug,
    contentTypeCode: 'content_pages',
  };
  const error = useSelector((state: StoreState) =>
    getContentError(state, queryContent),
  );
  const isLoading = useSelector((state: StoreState) =>
    isContentLoading(state, queryContent),
  );
  const contentPage = useSelector((state: StoreState) =>
    getContents(state, queryContent),
  );
  const action = useAction(fetchContentPagesAction);
  const fetchContentPages = (): void => action(slug, contentType, strategy);
  const resetContents = useAction(resetContentsAction);

  useEffect(() => {
    !contentPage && fetchContentPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentPage, slug]);

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
    resetContents,
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
    fetchContentPages,
  };
};

export default useContentPages;
