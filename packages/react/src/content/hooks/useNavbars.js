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
 * Hook to return actions and selectors for content navigation data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useNavbars
 * @memberof module:content/hooks
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
export default (navKey, params, pageSize) => {
  const query = {
    codes: navKey,
    contentTypeCode: 'navbars',
    environmentCode: process.env.WEB_APP_CONTENT_ENV || '',
    'target.country': params?.countryCode,
    'target.language': params?.cultureCode,
    'target.benefits': params?.benefits,
    'target.contentzone': params?.contentzone,
    pageSize,
  };
  const navigationError = useSelector(state => getContentError(state, query));
  const isNavigationLoading = useSelector(state =>
    isContentLoading(state, query),
  );
  const navigation = useSelector(state => getContents(state, query));
  const action = useAction(doGetContent(getContentClient));
  const fetchNavbars = () => action(query);

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
