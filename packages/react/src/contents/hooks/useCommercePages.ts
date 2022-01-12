import {
  fetchCommercePages as fetchCommercePagesAction,
  getContentError,
  getContents,
  isContentLoading,
  resetContents as resetContentsAction,
} from '@farfetch/blackout-redux/contents';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { CommercePagesParams, UseCommercePages } from '../types';
import type { StoreState } from '@farfetch/blackout-redux/types';

/**
 * Hook to return actions and selectors for Commerce page data.
 * The action to fetch content will be automatically called so there is no need to refetch.
 *
 * @function useCommercePage
 * @memberof module:content/hooks
 *
 * @param {string} slug - Slug of the commerce page to fetch for data.
 * @param {object} params - The target parameters that a commerce page is configured.
 * @param {string} params.type - Query by a page type.
 * @param {number} [params.id] - Query by a specified product or set identifier.
 * @param {number} [params.gender] - Query by a gender (E.g. 0 = Woman, 1 = Man, 2 = Unisex, 3 = Kid).
 * @param {number} [params.brand] - Query by a specified brand identifier.
 * @param {string} [params.category] - Query by a specified category identifiers, separated
 * by commas (E.g. 139065,139088).
 * @param {string} [params.priceType] - Query by a specified price type, separated by commas
 * (E.g. 0,1,2).
 * @param {number} [params.sku] - Query by a specified sku identifier.
 * @param {number} [pageIndex=1] - Number of the page to get, starting at 1. The default is 1.
 * @param {number} [pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 * @param {string} [strategy=default] - Strategy to get best ranking commerce page.
 *
 * @returns {object} - Returns actions and selectors for commerce page data.
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
     *
     * @type {object[]}
     */
    commercePage,
    /**
     * Reset contents.
     *
     * @type {object}
     */
    resetContents,
    /**
     * Loading state for a specific Commerce Page.
     *
     * @type {object}
     */
    isLoading,
    /**
     * Error state for a specific Commerce Page.
     *
     * @type {object}
     */
    error,
    /**
     * Fetch Commerce Page content for a specific slug.
     *
     * @type {Function}
     */
    fetchCommercePages,
  };
};

export default useCommercePages;
