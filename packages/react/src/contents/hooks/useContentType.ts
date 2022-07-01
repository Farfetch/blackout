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
import type { Params, UseContentType } from '../types';

/**
 * Hook to return actions and selectors for custom content type data. The action to
 * fetch content will be automatically called so there is no need to refetch.
 *
 * @param codes           - List of codes that representing the content code
 *                          (about-us|today-news|header|productId...).
 * @param contentTypeCode - The custom content type unique code (e.g. 'careers').
 * @param params          - The target parameters that a content page is configured.
 * @param pageSize        - Size of each page, as a number between 1 and 180. The default is 60.
 *
 * @returns - Returns actions and selectors for custom content type data.
 */
const useContentType = (
  codes: string | string[],
  contentTypeCode: string,
  params?: Params,
  pageSize?: number,
): UseContentType => {
  const query = {
    ...(codes && { codes }),
    contentTypeCode,
    // @ts-ignore
    // dotenv does´t exist in this BOX and typing `process` will generate an error in tests.
    environmentCode:
      params?.environmentcode || process.env.WEB_APP_CONTENT_ENV || '',
    target: {
      country: params?.countryCode,
      language: params?.cultureCode,
      benefits: params?.benefits,
      contentzone: params?.contentzone,
      preview: params?.preview,
    },
    pageSize,
  };
  const isContentTypeLoading = useSelector((state: StoreState) =>
    isContentLoading(state, query),
  );
  const contentTypeError = useSelector((state: StoreState) =>
    getContentError(state, query),
  );
  const contentType = useSelector((state: StoreState) =>
    getContents(state, query),
  );
  const action = useAction(fetchContentAction);
  const fetchContentType = (): void => action(query);

  useEffect(() => {
    !contentType && fetchContentType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, codes, contentTypeCode]);

  return {
    /**
     * Get the result for a specific Custom content type.
     */
    contentType,
    /**
     * Loading state for a specific Custom content type.
     */
    isContentTypeLoading,
    /**
     * Error state for a specific Custom content type.
     */
    contentTypeError,
    /**
     * Fetch custom content type editorial data.
     */
    fetchContentType,
  };
};

export default useContentType;
