/**
 * @module products/listing/selectors
 * @category Products listing
 * @subcategory Selectors
 */
import { buildFacetChildren, getMaxDepth, getShallowestDepth } from '../utils';
import { createSelector } from 'reselect';
import {
  getEntity,
  getFacets,
  getFacetsByIds,
  getProduct,
} from '../../../entities/redux/selectors';
import { getError, getHash, getIsHydrated, getIsLoading } from './reducer';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../../package.json';
import { warnDeprecatedMethod } from '../../../helpers';
import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import isEmpty from 'lodash/isEmpty';

/**
 * Retrieves the current listing hash.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {string} Listing identifier composed by subfolder, slug and query.
 *
 * @example
 * import { getListingHash } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     hash: getListingHash(state)
 * });
 *
 */
export const getListingHash = state => getHash(state.listing);

/**
 * Retrieves the error thrown by current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {?object} Listing error.
 *
 * @example
 * import { getListingError } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 * error: getListingError(state)
 * });
 */
export const getListingError = (state, hash = getListingHash(state)) =>
  getError(state.listing)[hash];

/**
 * Retrieves the hydration condition from current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {boolean} Whether a listing is loading or not.
 *
 * @example
 * import { isListingHydrated } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     isHydrated: isListingHydrated(state)
 * });
 *
 */
export const isListingHydrated = (state, hash = getListingHash(state)) =>
  getIsHydrated(state.listing)[hash];

/**
 * Retrieves the loading condition from current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {boolean} Whether a listing is loading or not.
 *
 * @example
 * import { isListingLoading } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isListingLoading(state)
 * });
 *
 */
export const isListingLoading = (state, hash = getListingHash(state)) =>
  getIsLoading(state.listing)[hash];

/**
 * Retrieves the result of a specific listing identified by its hash.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {?object} - Listing result.
 *
 * @example
 * import { getListingResult } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     result: getListingResult(state, hash)
 * });
 *
 */
export const getListingResult = (state, hash = getListingHash(state)) => {
  return getEntity(state, 'searchResults', hash);
};

/**
 * Retrieves product id's from the current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {(Array|undefined)} List of products ids.
 *
 * @example
 * import { getListingProductsIds } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     productIds: getListingProductsIds(state, hash)
 * });
 *
 */
export const getListingProductsIds = state =>
  getListingResult(state)?.products?.entries;

/**
 * Retrieves the loading condition of the next page of the current listing.
 * This selector is suppose to be used in combination with the
 * doGetInfiniteListing action.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {boolean} Whether the next page of a listing is loading or not.
 *
 * @example
 * import { isNextListingLoading } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     isNextListingLoading: isNextListingLoading(state)
 * });
 *
 */
export const isNextListingLoading = (state, hash = getListingHash(state)) =>
  isListingLoading(state, hash) && !!getListingProductsIds(state, hash);

/**
 * Retrieves the loading condition from an infinite listing.
 * This selector is suppose to be used in combination
 * with the doGetInfiniteListing action.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {boolean} Whether an infinite listing is loading or not.
 *
 * @example
 * import { isInfiniteListingLoading } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     isInfiniteListingLoading: isInfiniteListingLoading(state)
 * });
 *
 */
export const isInfiniteListingLoading = (state, hash = getListingHash(state)) =>
  isListingLoading(state, hash) && !getListingProductsIds(state, hash);

/**
 * Retrieves a list of products for the current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {?Array} Array of products.
 *
 * @example
 * import { getListingProducts } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     products: getListingProducts(state)
 * });
 *
 */
export const getListingProducts = createSelector(
  [getListingProductsIds, state => getEntity(state, 'products')],
  (listingProductsIds, products) => listingProductsIds?.map(id => products[id]),
);

/**
 * Retrieves pagination information about current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {(object|undefined)} Pagination object.
 *
 * @example
 * import { getListingPagination } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     pagination: getListingPagination(state)
 * });
 *
 * @example
 * // Array returned for a listing
 * {
 *     number: 1, // Current page
 *     pageSize: 20, // Number of products per page
 *     totalItems: 89, // Total of products
 *     totalPages: 5 // Total of pages
 * };
 *
 */
export const getListingPagination = createSelector(
  [(state, hash = getListingHash(state)) => getListingResult(state, hash)],
  result => {
    if (!result) return;

    return {
      number: result?.products?.number,
      pageSize: result?.config?.pageSize,
      totalItems: result?.products?.totalItems,
      totalPages: result?.products?.totalPages,
    };
  },
);

/**
 * Retrieves breadcrumbs information about current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {(object|undefined)} Breadcrumbs info.
 *
 * @example
 * import { getListingBreadcrumbs } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     breadcrumbs: getListingBreadcrumbs(state)
 * });
 *
 * @example
 * // Array returned for an accessories listing
 * [
 *      {
 *          text: "Woman",
 *          slug: null,
 *          link: '/en-pt/shopping/woman'
 *          parent: false
 *      },
 *      {
 *          text: "Accessories",
 *          slug: null,
 *          link: '/en-pt/shopping/woman/accessories'
 *          parent: false
 *      },
 * ]
 *
 */
export const getListingBreadcrumbs = state =>
  getListingResult(state)?.breadCrumbs;

/**
 * Returns all the info about color grouping for the given product id.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Product identifier.
 *
 * @returns {(object|undefined)} Color grouping object.
 *
 * @example
 * import { getListingGroupedEntries } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     groupedEntries: getListingGroupedEntries(state, productId)
 * });
 *
 * @example
 * // Result of color grouping
 * {
 *  totalItems: 20, // Total colors available
 *  remaining: 15, // Number of remaining colors available
 *  entries: [ // Info about the available colors
 *      {
 *          productId: 12912485,
 *          merchantId: 9359,
 *          shortDescription: 'Cotton Patchwork Trousers',
 *          images: [
 *              {
 *                  order: 1,
 *                  size: '50',
 *                  url: 'image-1'
 *              }
 *          ]
 *      }
 *  ]
 *};
 *
 */
export const getListingGroupedEntries = createSelector(
  [(state, productId) => getProduct(state, productId)],
  product => {
    const groupedEntries = product?.groupedEntries;

    if (!groupedEntries) return;

    return {
      totalItems: groupedEntries.totalItems,
      remaining: groupedEntries.totalItems - groupedEntries.entries.length,
      entries: groupedEntries.entries,
    };
  },
);

/**
 * Retrieves the url from the redirect information.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {(string|undefined)} Redirect url.
 *
 * @example
 * import { getRedirectUrl } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     redirectUrl: getRedirectUrl(state)
 * });
 *
 */
export const getRedirectUrl = state =>
  getListingResult(state)?.redirectInformation?.redirectUrl;

/**
 * Retrieves if a listing is cached by its hash.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {boolean} Whether the listing is cached or not.
 *
 * @example
 * import { isListingInCache } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     isListingInCache: isListingInCache(state, hash)
 * });
 *
 */
export const isListingInCache = (state, hash) =>
  !!getListingResult(state, hash);

/**
 * Retrieves the current applied filters (known as `filterSegments`) of the
 * current listing.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {(object|undefined)} Applied filters in the format of
 * `{ facetKey: [valueId] }`.
 *
 * @example
 * import { getListingActiveFilters } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     activeFilters: getListingActiveFilters(state)
 * });
 *
 * @example
 * // Array returned for a listing with active filters on colors and categories
 * {
 *   colors: [3, 11],
 *   categories: [187345]
 * }
 */
export const getListingActiveFilters = createSelector(
  [(state, hash = getListingHash(state)) => getListingResult(state, hash)],
  result =>
    result?.filterSegments?.reduce((acc, { key, value, valueUpperBound }) => {
      const isDiscount = key === 'discount';
      let activeFilterValue = value;

      if (isDiscount) {
        activeFilterValue =
          valueUpperBound !== 0 ? `${value}-${valueUpperBound}` : value;
      }

      if (acc[key]) {
        acc[key].push(activeFilterValue);
      } else {
        // @TODO: Review this to apply the same logic when is
        // Price-range and Discount-multiple - the value should be
        // a concatnation of value and valueUpperBound
        if (valueUpperBound !== 0 && !isDiscount) {
          acc[key] = [value, valueUpperBound];
        } else {
          acc[key] = [activeFilterValue];
        }
      }

      return acc;
    }, {}),
);

// @TODO: Remove this selector in version 2.0.0.
/**
 * Retrieves the count of the current applied filters
 * Notice: the model provides a `fromQueryString`, but I don't know how will
 * this behave in native apps.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @deprecated Since version 1.x.x.
 * Will be deleted in version 2.0.0.
 *
 * @param {object} state - Application state.
 *
 * @returns {(number|undefined)} Total count of the applied filters.
 *
 * @example
 * import { getListingActiveFiltersCount } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     filtersCount: getListingActiveFiltersCount(state),
 * });
 */
export const getListingActiveFiltersCount = state => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/products/listing/redux/getListingActiveFiltersCount',
  );

  const filterSegments = getListingResult(state)?.filterSegments;

  const reducer = (acc, { fromQueryString }) => {
    let counter = acc;
    if (fromQueryString) {
      return ++counter;
    }
    return acc;
  };

  const count = filterSegments?.reduce(reducer, 0);

  return count;
};

/**
 * Retrieves the count of the current selected filters by the user - i.e.
 * Number of filters applied that are also facets, meaning the user can
 * select and unselect them in the listing filters.
 * This may be useful to know when to show a "Clear filters" button.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {(number|undefined)} Total count of selected filters.
 *
 * @example
 * import { getListingSelectedFiltersCount } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 *     filtersCount: getListingSelectedFiltersCount(state),
 * });
 */
export const getListingSelectedFiltersCount = state => {
  const result = getListingResult(state);
  const filterSegments = result?.filterSegments;
  const facetGroups = result?.facetGroups;

  if (!filterSegments || !facetGroups) {
    return;
  }

  return filterSegments.reduce((acc, { type }) => {
    // Filter segments of type 9 (sizes) may be set and unset
    // with by using the facet group of type 24 (sizes by category)
    if (
      type === 9 &&
      facetGroups.find(
        ({ type: facetType }) => facetType === type || facetType === 24,
      )
    ) {
      return acc + 1;
    }

    if (facetGroups.find(({ type: facetType }) => facetType === type)) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

/**
 * Retrieves the current listing sorting order.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {object} Sort and sort direction.
 *
 * @example
 * import { getListingSort } from '@farfetch/blackout-core/products/listing/redux';
 *
 * const mapStateToProps = state => ({
 * selectedSort: getListingSort(state)
 * });
 */
export const getListingSort = createSelector(
  [(state, hash = getListingHash(state)) => getListingResult(state, hash)],
  result => {
    const sort = result?.config?.sort;
    const sortDirection = result?.config?.sortDirection;

    return { sort, sortDirection };
  },
);

/**
 * Find all facets groups belonging to the spectific type.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {number} facetGroupType - Facet group type to find.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {(Array|undefined)} Array with all facets groups filtered by the
 * type received, undefined otherwise.
 */
export const getFacetsGroupsByType = createSelector(
  [
    (state, facetGroupType, hash = getListingHash(state)) =>
      getListingResult(state, hash),
    (state, facetGroupType) => facetGroupType,
  ],
  (result, facetGroupType) => {
    if (!result) {
      return;
    }

    return result.facetGroups.filter(({ type }) => type === facetGroupType);
  },
);

/**
 * Find all facets belonging to the spectific facet group type.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {number} facetGroupType - Facet group type to find.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 *
 * @returns {(Array|undefined)} Array with all facets content filtered by the
 * type received, undefined otherwise.
 */
export const getFacetsByFacetGroupType = (
  state,
  facetGroupType,
  hash = getListingHash(state),
) => {
  const facetGroupsWithType = getFacetsGroupsByType(
    state,
    facetGroupType,
    hash,
  );

  // Does not exist facet groups to the specific type received?
  if (isEmpty(facetGroupsWithType)) {
    return;
  }

  const facetsIds = flattenDeep(
    facetGroupsWithType.reduce((acc, facetGroup) => {
      acc.push(facetGroup.values);

      return acc;
    }, []),
  );
  return getFacetsByIds(state, facetsIds);
};

/**
 * Construct all hierarchical facets with children. As the name states, this
 * only works with filters of the 'hierarchical' format (which are the ones that
 * have a parent/children relationship).
 * This is particularly useful if you want to build, for example, a category
 * filter tree to display. Something like:
 * [ ] Clothing
 *     [ ] Jackets
 *         [ ] Blazers
 *     [ ] Pants
 *         [ ] Tailored pants
 *         [ ] Regular-Fit & Straight Leg Pants
 * This will not work with any other format because the `parentId` is always 0.
 *
 * @function
 * @memberof module:products/listing/selectors
 *
 * @param {object} state - Application state.
 * @param {number} facetGroupType - Facet group type to find.
 * @param {string} hash - Listing identifier composed by subfolder, slug and
 * query.
 * @param {number} initialDepth - First facet group depth level.
 * @param {number} dynamic - Dynamic value of the facet group to find. Useful
 * for when there are more than one facet group type, like woman and man
 * categories.
 *
 * @returns {(Array|undefined)} - All facets built with children, undefined
 * otherwise.
 */
export const getHierarchicalFacetsWithChildren = createSelector(
  [
    (state, facetGroupType, hash = getListingHash(state)) =>
      getFacetsGroupsByType(state, facetGroupType, hash),
    (state, facetGroupType, hash = getListingHash(state)) =>
      getFacetsByFacetGroupType(state, facetGroupType, hash),
    getFacets,
    (state, facetGroupType, hash, initialDepth) => initialDepth,
    (state, facetGroupType, hash, initialDepth, dynamic) => dynamic,
  ],
  (
    facetGroupsWithType,
    facetsByFacetGroupType,
    facets,
    initialDepth,
    dynamic,
  ) => {
    const isOtherThanHierarchical = facetGroupsWithType?.some(
      ({ format }) => format !== 'hierarchical',
    );

    // Does not exist facet groups to the specific type received?
    // Return nothing if there are no facet groups of the type specified or if
    // the facet group is not of the 'hierarchical' format
    if (isEmpty(facetGroupsWithType) || isOtherThanHierarchical) {
      return;
    }

    const shallowestDepth = initialDepth
      ? Math.min(initialDepth, getMaxDepth(facetGroupsWithType))
      : getShallowestDepth(facetGroupsWithType);
    const firstFacetGroup = facetGroupsWithType.find(
      ({ deep, dynamic: facetDynamic }) =>
        deep === shallowestDepth &&
        (dynamic === undefined || facetDynamic === dynamic),
    );

    return flatten(firstFacetGroup.values).map(id => {
      const facet = facets[id];

      // Prevent infinite loops if the parent id is the same as itself. This has
      // happened when we had wrong data from the API, namely a duplicate
      // "Black" color, which one of them had the following:
      // {
      //   id: 'colors_0',
      //   parentId: 'colors_0',
      // }
      // This is impossible, having the parent id as itself, so we prevent the
      // infinite recursion of `buildFacetChildren`.
      if (facet.id === facet.parentId) {
        return facet;
      }

      return {
        ...facet,
        children: buildFacetChildren(facetsByFacetGroupType, facet.id),
      };
    });
  },
);
