import {
  fetchContent as fetchContentAction,
  getContentError,
  getContents,
  isContentLoading,
} from '@farfetch/blackout-redux/contents';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Params, UseNavbars } from '../types';
import type { StoreState } from '@farfetch/blackout-redux/types';

/**
 * Hook to return actions and selectors for content navigation data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useNavbars
 * @memberof module:contents/hooks
 *
 * @param {string} navKey - Key name to query for a Navbar.
 * @param {object} params - The target parameters that a content page is configured.
 * @param {string} params.countryCode - Query a content by a specific country (country:GB).
 * @param {string} params.cultureCode - Query a content by a specific language (language:en-GB).
 * @param {string} [params.benefits] - Query a content by is benefits (benefits:test).
 * @param {string} [params.contentzone] - Query a content by a specific content zone (contentzone:ROW).
 * @param {number} [pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns {object} - Returns actions and selectors for content navigation data.
 */
const useNavbars = (
  navKey: string,
  params: Params,
  pageSize?: number,
): UseNavbars => {
  const query = {
    codes: navKey,
    contentTypeCode: 'navbars',
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
  const isNavigationLoading = useSelector((state: StoreState) =>
    isContentLoading(state, query),
  );
  const navigationError = useSelector((state: StoreState) =>
    getContentError(state, query),
  );
  const navigation = useSelector((state: StoreState) =>
    getContents(state, query),
  );
  const action = useAction(fetchContentAction);
  const fetchNavbars = (): void => action(query);

  useEffect(() => {
    !navigation && fetchNavbars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, navKey]);

  return {
    /**
     * Get the result for a specific Navigation content.
     *
     * @type {object[]}
     */
    navigation,
    /**
     * Loading state for a specific Navigation content.
     *
     * @type {object}
     */
    isNavigationLoading,
    /**
     * Error state for a specific Navigation content.
     *
     * @type {object}
     */
    navigationError,
    /**
     * Fetch Navigation content for a specific nav key.
     *
     * @type {Function}
     */
    fetchNavbars,
  };
};

export default useNavbars;
