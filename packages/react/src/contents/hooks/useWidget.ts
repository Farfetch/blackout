import {
  fetchContent as fetchContentAction,
  getContentError,
  getContents,
  isContentLoading,
} from '@farfetch/blackout-redux/contents';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Params, UseWidget } from '../types';
import type { StoreState } from '@farfetch/blackout-redux/types';

/**
 * Hook to return actions and selectors for content widget data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useWidget
 * @memberof module:contents/hooks
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
const useWidget = (
  widgetKey: string,
  params: Params,
  pageSize?: number,
): UseWidget => {
  const query = {
    codes: widgetKey,
    contentTypeCode: 'widgets',
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
  const isWidgetLoading = useSelector((state: StoreState) =>
    isContentLoading(state, query),
  );
  const widgetError = useSelector((state: StoreState) =>
    getContentError(state, query),
  );
  const widget = useSelector((state: StoreState) => getContents(state, query));
  const action = useAction(fetchContentAction);
  const fetchWidget = (): void => action(query);

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

export default useWidget;
