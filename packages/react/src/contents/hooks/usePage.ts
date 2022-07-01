import {
  fetchContent as fetchContentAction,
  getContentError,
  getContents,
  isContentLoading,
  resetContents,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Params, UsePage } from '../types';

/**
 * Hook to return actions and selectors for content page data. The action to fetch
 * content will be automatically called so there is no need to refetch.
 *
 * @param slug     - Slug of the page to fetch for data.
 * @param params   - The target parameters that a content page is configured.
 * @param pageSize - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns - Returns actions and selectors for content page data.
 */
const usePage = (slug: string, params?: Params, pageSize?: number): UsePage => {
  const query = {
    codes: slug,
    contentTypeCode: 'pages',
    // @ts-ignore
    // dotenv does´t exist in this BOX and typing `process` will generate an error in tests.
    environmentCode: process.env.WEB_APP_CONTENT_ENV || '',
    target: {
      country: params?.countryCode,
      language: params?.cultureCode,
      benefits: params?.benefits,
      contentzone: params?.contentzone,
    },
    pageSize,
  };
  const error = useSelector((state: StoreState) =>
    getContentError(state, query),
  );
  const isLoading = useSelector((state: StoreState) =>
    isContentLoading(state, query),
  );
  const page = useSelector((state: StoreState) => getContents(state, query));
  const action = useAction(fetchContentAction);
  const fetchContent = (): void => action(query);
  const resetContent = useAction(resetContents);

  useEffect(() => {
    !page && fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slug]);

  return {
    /**
     * Get the result for a specific Page.
     */
    page,
    /**
     * Reset contents.
     */
    resetContent,
    /**
     * Loading state for a specific Page.
     */
    isLoading,
    /**
     * Error state for a specific Page.
     */
    error,
    /**
     * Fetch Page content for a specific slug.
     */
    fetchContent,
  };
};
export default usePage;
