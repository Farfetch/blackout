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
 * Hook to return actions and selectors for content widget data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useWidget
 * @memberof module:content/hooks
 *
 * @param {string} widgetKey - Key name to query for a Widget.
 * @param {object} params - The target parameters that a content page is configured.
 * @param {string} params.countryCode - Query a content by a specific country (country:GB).
 * @param {string} params.cultureCode - Query a content by a specific language (language:en-GB).
 * @param {string} [params.benefits] - Query a content by is benefits (benefits:test).
 * @param {string} [params.contentzone] - Query a content by a specific content zone (contentzone:ROW).
 * @param {number} [pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns {object} - Returns actions and selectors for content widget data.
 */
export default (widgetKey, params, pageSize) => {
  const query = {
    codes: widgetKey,
    contentTypeCode: 'widgets',
    environmentCode: process.env.WEB_APP_CONTENT_ENV || '',
    'target.country': params?.countryCode,
    'target.language': params?.cultureCode,
    'target.benefits': params?.benefits,
    'target.contentzone': params?.contentzone,
    pageSize,
  };
  const widgetError = useSelector(state => getContentError(state, query));
  const isWidgetLoading = useSelector(state => isContentLoading(state, query));
  const widget = useSelector(state => getContents(state, query));
  const action = useAction(doGetContent(getContentClient));
  const fetchWidget = () => action(query);

  useEffect(() => {
    !widget && fetchWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget, widgetKey]);

  return {
    /**
     * Get the result for a specific Widget.
     *
     * @type {object[]}
     */
    widget,
    /**
     * Loading state for a specific Widget.
     *
     * @type {object}
     */
    isWidgetLoading,
    /**
     * Error state for a specific Widget.
     *
     * @type {object}
     */
    widgetError,
    /**
     * Fetch Widget content for a specific widgetKey.
     *
     * @type {Function}
     */
    fetchWidget,
  };
};
