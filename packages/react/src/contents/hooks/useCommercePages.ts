import {
  fetchCommercePages as fetchCommercePagesAction,
  getContentError,
  getContents,
  isContentLoading,
  resetContents as resetContentsAction,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { CommercePagesParams, UseCommercePages } from '../types';

/**
 * Hook to return actions and selectors for Commerce page data. The action to fetch
 * content will be automatically called so there is no need to refetch.
 *
 * @param slug      - Slug of the commerce page to fetch for data.
 * @param params    - The target parameters that a commerce page is configured.
 * @param pageIndex - Number of the page to get, starting at 1. The default is 1.
 * @param pageSize  - Size of each page, as a number between 1 and 180. The default is 60.
 * @param strategy  - Strategy to get best ranking commerce page.
 *
 * @returns - Returns actions and selectors for commerce page data.
 */
const useCommercePages = (
  slug: string,
  params: CommercePagesParams,
  pageIndex?: number,
  pageSize?: number,
  strategy = 'default',
): UseCommercePages => {
  const queryCommerce = {
    type: params.type,
    id: params?.id,
    gender: params?.gender,
    brand: params?.brand,
    category: params?.category,
    priceType: params?.priceType,
    sku: params?.sku,
    pageSize,
    pageIndex,
  };
  const queryContent = {
    codes: slug,
    contentTypeCode: 'commerce_pages',
    pageIndex,
    pageSize,
  };
  const error = useSelector((state: StoreState) =>
    getContentError(state, queryContent),
  );
  const isLoading = useSelector((state: StoreState) =>
    isContentLoading(state, queryContent),
  );
  const commercePage = useSelector((state: StoreState) =>
    getContents(state, queryContent),
  );
  const action = useAction(fetchCommercePagesAction);
  const fetchCommercePages = (): void => action(queryCommerce, slug, strategy);
  const resetContents = useAction(resetContentsAction);

  useEffect(() => {
    !commercePage && fetchCommercePages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commercePage, slug]);

  return {
    /**
     * Get the result for a specific Commerce Page.
     */
    commercePage,
    /**
     * Reset contents.
     */
    resetContents,
    /**
     * Loading state for a specific Commerce Page.
     */
    isLoading,
    /**
     * Error state for a specific Commerce Page.
     */
    error,
    /**
     * Fetch Commerce Page content for a specific slug.
     */
    fetchCommercePages,
  };
};

export default useCommercePages;
