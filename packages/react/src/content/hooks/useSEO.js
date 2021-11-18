import {
  doGetSEO,
  getSEO,
  getSEOError,
  isSEOLoading,
  resetContents,
} from '@farfetch/blackout-core/contents/redux';
import { getSEO as getSEOclient } from '@farfetch/blackout-core/contents/client';
import { useAction } from '../../utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

/**
 * Hook to return actions and selectors for SEO metadata.
 *
 * @function
 * @memberof module:content/hooks
 *
 * @param {object} query - Query object with search terms to apply.
 * @param {string} query.pageType - The type of the page we are searching (pages|stories...).
 * @param {object} query.param - An object containing some parameters for product listing (BrandName|CategoryName|TotalNumberItems...).
 * @param {string} query.path - The pathname of the location.
 * @param {string} query.subPageType - The sub group of pages about products.
 * @param {object} pathname - The pathname of the location.
 *
 * @returns {object} - Returns actions and selectors for the SEO metadata.
 */
export default (query, pathname) => {
  const error = useSelector(state => getSEOError(state, query));
  const isLoading = useSelector(state => isSEOLoading(state, query));
  const seo = useSelector(state => getSEO(state, query));
  // Actions
  const fetchSEO = useAction(doGetSEO(getSEOclient));
  const reset = useAction(resetContents);

  useEffect(() => {
    !seo && !isLoading && fetchSEO(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seo, query, pathname]);

  return {
    /**
     * Get SEO for a specific location.
     *
     * @type {Function}
     */
    fetchSEO,
    /**
     * Reset contents.
     *
     * @type {object}
     */
    reset,
    /**
     * SEO error status.
     *
     * @type {boolean}
     */
    error,
    /**
     * SEO loading status.
     *
     * @type {boolean}
     */
    isLoading,
    /**
     * SEO result/payload.
     *
     * @type {object}
     */
    seo,
  };
};
