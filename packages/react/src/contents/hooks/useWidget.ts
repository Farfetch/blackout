import {
  fetchContent as fetchContentAction,
  getContentError,
  getContents,
  isContentLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Params, UseWidget } from '../types';

/**
 * Hook to return actions and selectors for content widget data. The action to
 * fetch content will be automatically called so there is no need to refetch.
 *
 * @param widgetKey - Key name to query for a Widget.
 * @param params    - The target parameters that a content page is configured.
 * @param pageSize  - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns - Returns actions and selectors for content widget data.
 */
const useWidget = (
  widgetKey: string,
  params?: Params,
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
     */
    widget,
    /**
     * Loading state for a specific Widget.
     */
    isWidgetLoading,
    /**
     * Error state for a specific Widget.
     */
    widgetError,
    /**
     * Fetch Widget content for a specific widgetKey.
     */
    fetchWidget,
  };
};

export default useWidget;
