import {
  buildFacetTree,
  generateProductsListHash,
  getMaxDepth,
} from '../utils';
import { createSelector } from 'reselect';
import {
  getEntities,
  getEntityById,
  getFacets,
  getFacetsByIds,
} from '../../entities/selectors';
import {
  getError,
  getHash,
  getIsHydrated,
  getIsLoading,
} from '../reducer/lists';
import flatten from 'lodash/flatten';
import flattenDeep from 'lodash/flattenDeep';
import getShallowestDepth from '../utils/getShallowestDepth';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import type {
  FacetEntity,
  FacetGroupsNormalized,
  ProductEntity,
  ProductsListEntity,
} from '../../entities/types';
import type { FacetGroup } from '@farfetch/blackout-client';
import type { ProductsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Checks if the type of the hash is a number or not. If it's a number, converts to
 * a final hash to make possible identify the products list entity.
 *
 * @param hash - Products list identifier composed by a list identifier (listing or sets), slug and
 *               query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns - Final hash to identify a products list entity.
 */
const checkHash = (hash: string | number | null): ProductsListEntity['hash'] =>
  typeof hash === 'number'
    ? generateProductsListHash(hash, {}, { isSet: true })
    : String(hash);

/**
 * Retrieves the current products list hash.
 *
 * @param state - Application state.
 *
 * @returns Products list identifier composed by a list identifier (listing or sets), slug and query.
 */
export const getProductsListHash = (state: StoreState) =>
  getHash((state.products as ProductsState).lists);

/**
 * Retrieves the error thrown by current products list.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Products list error.
 */
export const getProductsListError = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
) => getError((state.products as ProductsState).lists)[checkHash(hash)];

/**
 * Retrieves the hydration condition from current products list.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether a products list is hydrated or not.
 */
export const isProductsListHydrated = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
) => getIsHydrated((state.products as ProductsState).lists)[checkHash(hash)];

/**
 * Retrieves the loading condition from current products list.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether a products list is loading or not.
 */
export const isProductsListLoading = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
) => getIsLoading((state.products as ProductsState).lists)[checkHash(hash)];

/**
 * Retrieves the fetched status to a specific products list.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether a products list is fetched or not.
 */
export const isProductsListFetched = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
) =>
  getIsLoading((state.products as ProductsState).lists).hasOwnProperty(
    checkHash(hash),
  ) && isProductsListLoading(state, checkHash(hash)) === false;

/**
 * Retrieves the result of a specific products list identified by its hash or id.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns - Products list result.
 */
export const getProductsListResult = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
) => getEntityById(state, 'productsLists', checkHash(hash));

/**
 * Retrieves product id's from the current products list.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns List of products ids.
 */
export const getProductsListProductsIds = createSelector(
  [
    (state, hash = getProductsListHash(state)) =>
      getProductsListResult(state, checkHash(hash)),
  ],
  result => result?.products.entries,
) as (
  state: StoreState,
  hash?: string | number | null,
) => ProductEntity['id'][];

/**
 * Retrieves a list of products for the current products list.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Array of products.
 */
export const getProductsListProducts = createSelector(
  [
    (state, hash = getProductsListHash(state)) =>
      getProductsListProductsIds(state, checkHash(hash)),
    state => getEntities(state, 'products'),
  ],
  (listProductsIds, products) => listProductsIds?.map(id => products?.[id]),
) as (state: StoreState, hash?: string | number | null) => ProductEntity[];
/**
 * Retrieves a list of all products of multiple pages (of a single products list -
 * listings or sets) to allow the tenant to build an infinite scroll layout. This
 * join every products list with the same pathname/hash in the store, but with a
 * different page index.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Array of products.
 */
export const getProductsListProductsFromAllPages = createSelector(
  [
    state => state,
    (state, hash = getProductsListHash(state)) => checkHash(hash),
    state => getEntities(state, 'productsLists'),
  ],
  (state, hash, productsLists) => {
    /**
     * Auxiliary function to retrieve the final hash without the page index parameter.
     *
     * @param hash - Hash to remove the page index.
     *
     * @returns Hash without the page index.
     */
    const getHashWithoutPageIndex = (hash: string) => {
      // Remove the page index parameter
      let finalHash = hash?.replace(/&?pageindex=\d+/, '');

      // Checks if the final hash ends with a `?` and remove it
      if (finalHash?.charAt(finalHash.length - 1) === '?') {
        finalHash = finalHash?.slice(0, -1);
      }

      return finalHash;
    };

    // Gets the base hash to find all the pages related
    const hashWithoutPageIndex = getHashWithoutPageIndex(hash);
    // Find all listings related to the base hash

    if (!productsLists) {
      return [];
    }

    const productsListPages = Object.keys(productsLists).reduce((acc, hash) => {
      const productsListPageIndex = productsLists[hash]?.config
        .pageIndex as number;
      // We can store a products list if it's hash without page index is equal to
      // the initial hash encountered and if it's page index is not stored
      // yet (removing the products list and products duplicated)
      if (
        getHashWithoutPageIndex(hash) === hashWithoutPageIndex &&
        !acc.find(({ pageIndex }) => pageIndex === productsListPageIndex)
      ) {
        acc.push({ hash, pageIndex: productsListPageIndex });
      }
      // Returns an array of objects, where the objects only have the hash and
      // the page index parameters
      return acc;
    }, [] as Array<{ hash: string; pageIndex: number }>);
    // Sort the products list pages related by the page index parameter to guarantee
    // the products order
    const productsListPagesSorted = sortBy(productsListPages, 'pageIndex');
    // Get all the products from the product list pages sorted
    const allProducts = productsListPagesSorted.map(({ hash }) =>
      getProductsListProducts(state, hash),
    );

    return flatten(allProducts);
  },
) as (state: StoreState, hash?: string | number | null) => ProductEntity[];

/**
 * Retrieves pagination information about current products list.
 *
 * @example
 * ```
 * // Object returned
 * {
 *     number: 1, // Current page
 *     pageSize: 20, // Number of products per page
 *     totalItems: 89, // Total of products
 *     totalPages: 5 // Total of pages
 * };
 * ```
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Pagination object.
 */
export const getProductsListPagination = createSelector(
  [
    (state, hash = getProductsListHash(state)) =>
      getProductsListResult(state, checkHash(hash)),
  ],
  result => {
    if (!result) {
      return;
    }

    return {
      number: result?.products.number,
      pageSize: result?.config.pageSize,
      totalItems: result?.products.totalItems,
      totalPages: result?.products.totalPages,
    };
  },
) as (
  state: StoreState,
  hash?: string | number | null,
) =>
  | {
      number: ProductsListEntity['products']['number'];
      pageSize: ProductsListEntity['config']['pageSize'];
      totalItems: ProductsListEntity['products']['totalItems'];
      totalPages: ProductsListEntity['products']['totalPages'];
    }
  | undefined;

/**
 * Retrieves breadcrumbs information about current products list.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Breadcrumbs info.
 *
 * // Array returned for an accessories products list
 * [
 *  \{
 *    text: "Woman",
 *    slug: null,
 *    link: '/en-pt/shopping/woman'
 *    parent: false
 *  \},
 *  \{
 *    text: "Accessories",
 *    slug: null,
 *    link: '/en-pt/shopping/woman/accessories'
 *    parent: false
 *  \},
 * ].
 */
export const getProductsListBreadcrumbs = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
) => getProductsListResult(state, checkHash(hash))?.breadCrumbs;

/**
 * Retrieves if a products list is cached by its hash.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether the products list is cached or not.
 */
export const isProductsListCached = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
): boolean | undefined => !!getProductsListResult(state, checkHash(hash));

/**
 * Retrieves the current applied filters (known as `filterSegments`) of the current
 * products list.
 *
 * @example
 * ```
 * // Array returned for a products list with active filters on colors and
 * // categories
 * {
 *   colors: [3, 11],
 *   categories: [187345]
 * }
 * ```
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Applied filters in the format of `{ facetKey: [valueId] }`.
 */
export const getProductsListActiveFilters = createSelector(
  [
    (state, hash = getProductsListHash(state)) =>
      getProductsListResult(state, checkHash(hash)),
  ],
  result =>
    result?.filterSegments?.reduce((acc, { key, value, valueUpperBound }) => {
      const isDiscount = key === 'discount';
      let activeFilterValue = value as string | number;

      // If the active filter is a discount, its value format should be a string
      // 'value-valueUpperBound' (eg. '0-30') because that is the format needed
      // for the query to correctly filter the products.
      if (isDiscount) {
        activeFilterValue =
          valueUpperBound !== 0 ? `${value}-${valueUpperBound}` : value;
      }

      if (acc[key]) {
        acc[key]?.push(activeFilterValue);
      } else {
        if (valueUpperBound !== 0 && !isDiscount) {
          acc[key] = [value, valueUpperBound];
        } else {
          acc[key] = [activeFilterValue];
        }
      }

      return acc;
    }, {} as Record<string, Array<string | number>>),
) as (
  state: StoreState,
  hash?: string | number | null,
) => Record<string, Array<string | number>>;

/**
 * Retrieves the count of the current selected filters by the user - i.e. Number of
 * filters applied that are also facets, meaning the user can select and unselect
 * them in the products list filters. This not only considers "fromQueryString"
 * filters, but also filter slugs. This may be useful to know when to show a "Clear
 * filters" button.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Total count of selected filters.
 */
export const getProductsListSelectedFiltersCount = (
  state: StoreState,
  hash: string | number | null = getProductsListHash(state),
): number | undefined => {
  const result = getProductsListResult(state, checkHash(hash));
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
 * Retrieves the current products list sorting order.
 *
 * @param state - Application state.
 * @param hash  - Products list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Sort and sort direction.
 */
export const getProductsListSort = createSelector(
  [
    (state, hash = getProductsListHash(state)) =>
      getProductsListResult(state, checkHash(hash)),
  ],
  result => {
    const sort = result?.config.sort;
    const sortDirection = result?.config.sortDirection;

    return { sort, sortDirection };
  },
) as (
  state: StoreState,
  hash?: string | number | null,
) => {
  sort: ProductsListEntity['config']['sort'];
  sortDirection: ProductsListEntity['config']['sortDirection'];
};

/**
 * Find all facets groups belonging to the specific type.
 *
 * @param state          - Application state.
 * @param facetGroupType - Facet group type to find.
 * @param hash           - Products list identifier composed by a list identifier (listing or sets),
 *                         slug and query. Could be a string (listing or sets hash) or a number (set
 *                         id).
 *
 * @returns Array with all facets groups filtered by the type received, undefined otherwise.
 */
export const getProductsListFacetsGroupsByType = createSelector(
  [
    (state, facetGroupType, hash = getProductsListHash(state)) =>
      getProductsListResult(state, checkHash(hash)),
    (state: StoreState, facetGroupType: FacetGroup['type']) => facetGroupType,
  ],
  (result, facetGroupType) => {
    if (!result) {
      return;
    }

    return result.facetGroups.filter(({ type }) => type === facetGroupType);
  },
) as (
  state: StoreState,
  facetGroupType: FacetGroup['type'],
  hash?: string | number | null,
) => FacetGroupsNormalized | undefined;

/**
 * Find all facets belonging to the specific facet group type.
 *
 * @param state          - Application state.
 * @param facetGroupType - Facet group type to find.
 * @param hash           - Products list identifier composed by a list identifier (listing or sets),
 *                         slug and query. Could be a string (listing or sets hash) or a number (set
 *                         id).
 *
 * @returns Array with all facets content filtered by the type received, undefined otherwise.
 */
export const getProductsListFacetsByFacetGroupType = (
  state: StoreState,
  facetGroupType: FacetGroup['type'],
  hash: string | number | null = getProductsListHash(state),
): FacetEntity[] | undefined => {
  const facetGroupsWithType = getProductsListFacetsGroupsByType(
    state,
    facetGroupType,
    checkHash(hash),
  );

  // Does not exist facet groups to the specific type received?
  if (isEmpty(facetGroupsWithType)) {
    return;
  }

  const facetsIds = flattenDeep(
    facetGroupsWithType?.reduce((acc, facetGroup) => {
      acc.push(facetGroup.values);

      return acc;
    }, [] as Array<FacetEntity['id'][][]>),
  ) as Array<FacetEntity['id']>;

  return getFacetsByIds(state, facetsIds);
};

/**
 * Construct all hierarchical facets with children. As the name states, this only
 * works with filters of the 'hierarchical' format (which are the ones that have a
 * parent/children relationship). This is particularly useful if you want to build,
 * for example, a category filter tree to display. Something like: [ ] Clothing [ ]
 * Jackets [ ] Blazers [ ] Pants [ ] Tailored pants [ ] Regular-Fit & Straight Leg
 * Pants This will not work with any other format because the `parentId` is
 * always 0.
 *
 * @param state          - Application state.
 * @param facetGroupType - Facet group type to find.
 * @param options        - Additional options to refine the desired facets.
 *
 * @returns - All facets built with children, undefined otherwise.
 */
export const getHierarchicalFacetsWithChildren = createSelector(
  [
    (
      state: StoreState,
      facetGroupType: FacetGroup['type'],
      { hash = getProductsListHash(state) }: { hash?: string | null } = {},
    ) =>
      getProductsListFacetsGroupsByType(state, facetGroupType, checkHash(hash)),
    (
      state: StoreState,
      facetGroupType: FacetGroup['type'],
      { hash = getProductsListHash(state) }: { hash?: string | null } = {},
    ) =>
      getProductsListFacetsByFacetGroupType(
        state,
        facetGroupType,
        checkHash(hash),
      ),
    getFacets,
    (
      state: StoreState,
      facetGroupType: FacetGroup['type'],
      { initialDepth }: { initialDepth?: number } = {},
    ) => initialDepth,
    (
      state: StoreState,
      facetGroupType: FacetGroup['type'],
      { dynamic }: { dynamic?: number } = {},
    ) => dynamic,
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
      ? Math.min(
          initialDepth,
          getMaxDepth(facetGroupsWithType as FacetGroupsNormalized),
        )
      : getShallowestDepth(facetGroupsWithType as FacetGroupsNormalized);
    const firstFacetGroup = facetGroupsWithType?.find(
      ({ deep, dynamic: facetDynamic }) =>
        deep === shallowestDepth &&
        (dynamic === undefined || facetDynamic === dynamic),
    );

    // Return nothing if there are no facet groups of a given dynamic
    if (!firstFacetGroup) {
      return;
    }

    return flatten(firstFacetGroup.values).map(id => {
      const facet = facets?.[id];

      // Prevent infinite loops if the parent id is the same as itself. This has
      // happened when we had wrong data from the API, namely a duplicate
      // "Black" color, which one of them had the following:
      // {
      //   id: 'colors_0',
      //   parentId: 'colors_0',
      // }
      // This is impossible, having the parent id as itself, so we prevent the
      // infinite recursion of `buildFacetTree`.
      if (facet?.id === facet?.parentId) {
        return facet;
      }

      return {
        ...facet,
        children: buildFacetTree(facetsByFacetGroupType, facet.id),
      };
    });
  },
);
