import {
  buildFacetTree,
  generateProductListingHash,
  getFacetGroupsMaxDepth,
} from '../utils/index.js';
import { createSelector } from 'reselect';
import { flatten, flattenDeep, isEmpty, sortBy } from 'lodash-es';
import { getBrands } from '../../brands/selectors.js';
import { getCategories } from '../../categories/index.js';
import { getEntities, getEntityById } from '../../entities/selectors/index.js';
import {
  getError,
  getHash,
  getIsHydrated,
  getIsLoading,
} from '../reducer/lists.js';
import getShallowestDepth from '../utils/getFacetGroupsShallowestDepth.js';
import type {
  FacetEntity,
  FacetEntityWithChildren,
  FacetGroupDenormalized,
  FacetGroupsNormalized,
  HierarchicalFacet,
  ProductEntity,
  ProductEntityDenormalized,
  ProductListingEntity,
} from '../../entities/types/index.js';
import type { FacetGroup } from '@farfetch/blackout-client';
import type { ProductsState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Checks if the type of the hash is a number or not. If it's a number, converts to
 * a final hash to make possible identify the product listing entity.
 *
 * @param hash - product listing identifier composed by a list identifier (listing or sets), slug and
 *               query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns - Final hash to identify a product listing entity.
 */
const checkHash = (
  hash: string | number | null,
): ProductListingEntity['hash'] =>
  typeof hash === 'number'
    ? generateProductListingHash(hash, {}, { isSet: true })
    : String(hash);

/**
 * Retrieves the current product listing hash.
 *
 * @param state - Application state.
 *
 * @returns product listing identifier composed by a list identifier (listing or sets), slug and query.
 */
export const getProductListingHash = (state: StoreState) =>
  getHash((state.products as ProductsState).lists);

/**
 * Retrieves the error thrown by current product listing.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Product list error.
 */
export const getProductListingError = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) => getError((state.products as ProductsState).lists)[checkHash(hash)];

/**
 * Retrieves the hydration condition from current product listing.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether a product listing is hydrated or not.
 */
export const isProductListingHydrated = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) => getIsHydrated((state.products as ProductsState).lists)[checkHash(hash)];

/**
 * Retrieves the loading condition from current product listing.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether a product listing is loading or not.
 */
export const isProductListingLoading = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) => getIsLoading((state.products as ProductsState).lists)[checkHash(hash)];

/**
 * Retrieves the fetched status to a specific product listing.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether a product listing is fetched or not.
 */
export const isProductListingFetched = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) =>
  getIsLoading((state.products as ProductsState).lists).hasOwnProperty(
    checkHash(hash),
  ) && isProductListingLoading(state, checkHash(hash)) === false;

/**
 * Retrieves the result of a specific product listing identified by its hash or id.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns - Product list result.
 */
export const getProductListingResult = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) => getEntityById(state, 'productsLists', checkHash(hash));

/**
 * Retrieves product id's from the current product listing.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns List of product ids.
 */
export const getProductListingProductsIds: (
  state: StoreState,
  hash?: string | number | null,
) => ProductEntity['id'][] | undefined = createSelector(
  [
    (
      state,
      hash: string | number | null | undefined = getProductListingHash(state),
    ) => getProductListingResult(state, checkHash(hash)),
  ],
  result => result?.products.entries,
);

/**
 * Retrieves a list of products for the current product listing.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Array of products.
 */
export const getProductListingProducts: (
  state: StoreState,
  hash?: string | number | null,
) => ProductEntityDenormalized[] | undefined = createSelector(
  [
    (
      state,
      hash: string | number | null | undefined = getProductListingHash(state),
    ) => getProductListingProductsIds(state, checkHash(hash)),
    state => getEntities(state, 'products'),
    getBrands,
    getCategories,
  ],
  (listProductsIds, products, brands, categories) => {
    return listProductsIds
      ?.map(id => {
        const product = products?.[id];

        if (!product) {
          return undefined;
        }

        const brand =
          brands && product?.brand ? brands[product.brand] : undefined;
        const productCategories =
          categories && product?.categories?.map(id => categories[id]);

        return { ...product, brand, categories: productCategories };
      })
      .filter(Boolean) as ProductEntityDenormalized[];
  },
);

/**
 * Retrieves a list of all products of multiple pages (of a single product listing -
 * listings or sets) to allow the tenant to build an infinite scroll layout. This
 * join every product listing with the same pathname/hash in the store, but with a
 * different page index.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Array of products.
 */
export const getProductListingProductsFromAllPages: (
  state: StoreState,
  hash?: string | number | null,
) => ProductEntityDenormalized[] = createSelector(
  [
    state => state,
    (
      state,
      hash: string | number | null | undefined = getProductListingHash(state),
    ) => checkHash(hash),
    state => getEntities(state, 'productsLists'),
  ],
  (state, hash, productLists) => {
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

    if (!productLists) {
      return [];
    }

    const productListsPages = Object.keys(productLists).reduce((acc, hash) => {
      const productListPageIndex = productLists[hash]?.config
        .pageIndex as number;

      // We can store a product listing if it's hash without page index is equal to
      // the initial hash encountered and if it's page index is not stored
      // yet (removing the product listing and products duplicated)
      if (
        getHashWithoutPageIndex(hash) === hashWithoutPageIndex &&
        !acc.find(({ pageIndex }) => pageIndex === productListPageIndex)
      ) {
        acc.push({ hash, pageIndex: productListPageIndex });
      }

      // Returns an array of objects, where the objects only have the hash and
      // the page index parameters
      return acc;
    }, [] as Array<{ hash: string; pageIndex: number }>);
    // Sort the product listing pages related by the page index parameter to guarantee
    // the products order
    const productListsPagesSorted = sortBy(productListsPages, 'pageIndex');
    // Get all the products from the product listing pages sorted
    const allProducts = productListsPagesSorted
      .map(({ hash }) => getProductListingProducts(state, hash))
      .filter(Boolean) as ProductEntityDenormalized[][];

    return flatten(allProducts);
  },
);

/**
 * Retrieves pagination information about current product listing.
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
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Pagination object.
 */
export const getProductListingPagination: (
  state: StoreState,
  hash?: string | number | null,
) =>
  | {
      number: ProductListingEntity['products']['number'];
      pageSize: ProductListingEntity['config']['pageSize'];
      totalItems: ProductListingEntity['products']['totalItems'];
      totalPages: ProductListingEntity['products']['totalPages'];
    }
  | undefined = createSelector(
  [
    (
      state,
      hash: string | number | null | undefined = getProductListingHash(state),
    ) => getProductListingResult(state, checkHash(hash)),
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
);

/**
 * Retrieves breadcrumbs information about current product listing.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Breadcrumbs info.
 *
 * // Array returned for an accessories product listing
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
export const getProductListingBreadcrumbs = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) => getProductListingResult(state, checkHash(hash))?.breadCrumbs;

/**
 * Retrieves if a product listing is cached by its hash.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Whether the product listing is cached or not.
 */
export const isProductListingCached = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) => !!getProductListingResult(state, checkHash(hash));

/**
 * Retrieves the current applied filters (known as `filterSegments`) of the current
 * product listing.
 *
 * @example
 * ```
 * // Array returned for a product listing with active filters on colors and
 * // categories
 * {
 *   colors: [3, 11],
 *   categories: [187345]
 * }
 * ```
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Applied filters in the format of `{ facetKey: [valueId] }`.
 */
export const getProductListingActiveFilters: (
  state: StoreState,
  hash?: string | number | null,
) => Record<string, Array<string | number>> | undefined = createSelector(
  [
    (
      state,
      hash: string | number | null | undefined = getProductListingHash(state),
    ) => getProductListingResult(state, checkHash(hash)),
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
);

/**
 * Retrieves the count of the current selected filters by the user - i.e. Number of
 * filters applied that are also facets, meaning the user can select and unselect
 * them in the product listing filters. This not only considers "fromQueryString"
 * filters, but also filter slugs. This may be useful to know when to show a "Clear
 * filters" button.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Total count of selected filters.
 */
export const getProductListingSelectedFiltersCount = (
  state: StoreState,
  hash: string | number | null = getProductListingHash(state),
) => {
  const result = getProductListingResult(state, checkHash(hash));
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
 * Retrieves the current product listing sorting order.
 *
 * @param state - Application state.
 * @param hash  - Product list identifier composed by a list identifier (listing or sets), slug and
 *                query. Could be a string (listing or sets hash) or a number (set id).
 *
 * @returns Sort and sort direction.
 */
export const getProductListingSort: (
  state: StoreState,
  hash?: string | number | null,
) => {
  sort: ProductListingEntity['config']['sort'] | undefined;
  sortDirection: ProductListingEntity['config']['sortDirection'] | undefined;
} = createSelector(
  [
    (
      state,
      hash: string | number | null | undefined = getProductListingHash(state),
    ) => getProductListingResult(state, checkHash(hash)),
  ],
  result => {
    const sort = result?.config.sort;
    const sortDirection = result?.config.sortDirection;

    return { sort, sortDirection };
  },
);

/**
 * Find all facets groups belonging to the specific type.
 *
 * @param state          - Application state.
 * @param facetGroupType - Facet group type to find.
 * @param hash           - Product list identifier composed by a list identifier (listing or sets),
 *                         slug and query. Could be a string (listing or sets hash) or a number (set
 *                         id).
 *
 * @returns Array with all facets groups filtered by the type received, undefined otherwise.
 */
export const getProductListingFacetsGroupsByType: (
  state: StoreState,
  facetGroupType: FacetGroup['type'],
  hash?: string | number | null,
) => FacetGroupsNormalized | undefined = createSelector(
  [
    (
      state,
      facetGroupType,
      hash: string | number | null | undefined = getProductListingHash(state),
    ) => getProductListingResult(state, checkHash(hash)),
    (state: StoreState, facetGroupType: FacetGroup['type']) => facetGroupType,
  ],
  (result, facetGroupType) => {
    if (!result) {
      return;
    }

    return result.facetGroups.filter(({ type }) => type === facetGroupType);
  },
);

/**
 * Returns a specific facet by its id.
 *
 * @param state   - Application state.
 * @param facetId - Facet id.
 *
 * @returns Facet normalized.
 */
export const getFacet = (state: StoreState, facetId: FacetEntity['id']) =>
  getEntityById(state, 'facets', facetId);

/**
 * Returns all facets from state.
 *
 * @param state - Application state.
 *
 * @returns Object with key values pairs representing facetId and facet properties.
 */
export const getFacets = (state: StoreState) => getEntities(state, 'facets');

/**
 * Returns required facets by ids received by parameter.
 *
 * @param state    - Application state.
 * @param facetIds - Facets ids.
 *
 * @returns Array with all facets content requested.
 */
export const getFacetsByIds: (
  state: StoreState,
  facetIds: Array<FacetEntity['id']>,
) => FacetEntity[] | undefined = createSelector(
  [
    (state: StoreState) => state,
    (state: StoreState, facetIds: Array<FacetEntity['id']>) => facetIds,
  ],
  (state, facetIds: Array<FacetEntity['id']>) =>
    facetIds?.map(id => getFacet(state, id)).filter(Boolean) as FacetEntity[],
) as (
  state: StoreState,
  facetIds: Array<FacetEntity['id']>,
) => FacetEntity[] | undefined;

/**
 * Find all facets belonging to the specific facet group type.
 *
 * @param state          - Application state.
 * @param facetGroupType - Facet group type to find.
 * @param hash           - Product list identifier composed by a list identifier (listing or sets),
 *                         slug and query. Could be a string (listing or sets hash) or a number (set
 *                         id).
 *
 * @returns Array with all facets content filtered by the type received, undefined otherwise.
 */
export const getProductListingFacetsByFacetGroupType = (
  state: StoreState,
  facetGroupType: FacetGroup['type'],
  hash: string | number | null = getProductListingHash(state),
) => {
  const facetGroupsWithType = getProductListingFacetsGroupsByType(
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
export const getHierarchicalFacetsWithChildren: (
  state: StoreState,
  facetGroupType: FacetGroup['type'],
  options?: {
    hash?: string | number | null;
    initialDepth?: number;
    dynamic?: number;
  },
) => FacetEntityWithChildren[] | undefined = createSelector(
  [
    (
      state: StoreState,
      facetGroupType: FacetGroup['type'],
      {
        hash = getProductListingHash(state),
      }: { hash?: string | null | number } = {},
    ) =>
      getProductListingFacetsGroupsByType(
        state,
        facetGroupType,
        checkHash(hash),
      ),
    (
      state: StoreState,
      facetGroupType: FacetGroup['type'],
      {
        hash = getProductListingHash(state),
      }: { hash?: string | null | number } = {},
    ) =>
      getProductListingFacetsByFacetGroupType(
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
          getFacetGroupsMaxDepth(facetGroupsWithType as FacetGroupsNormalized),
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

    return flatten(firstFacetGroup.values)
      .map(id => {
        const facet = facets?.[id];

        if (!facet) {
          return null;
        }

        // Prevent infinite loops if the parent id is the same as itself. This has
        // happened when we had wrong data from the API, namely a duplicate
        // "Black" color, which one of them had the following:
        // {
        //   id: 'colors_0',
        //   parentId: 'colors_0',
        // }
        // This is impossible, having the parent id as itself, so we prevent the
        // infinite recursion of `buildFacetTree`.
        if (facet.id === facet.parentId) {
          return facet;
        }

        return {
          ...facet,
          children: buildFacetTree(facetsByFacetGroupType, facet.id),
        };
      })
      .filter(Boolean) as HierarchicalFacet[];
  },
);

export const getProductListingFacetGroups = createSelector(
  [getProductListingResult, getFacets],
  (listing, allFacets) =>
    listing?.facetGroups?.map(facetGroup => ({
      ...facetGroup,
      values: facetGroup.values[0]?.reduce((acc, facetGroupId) => {
        const facetEntity = allFacets?.[facetGroupId];

        if (facetEntity) {
          acc.push(facetEntity);
        }

        return acc;
      }, [] as FacetEntity[]),
    })),
) as (
  state: StoreState,
  hash?: string | number | null,
) => FacetGroupDenormalized[] | undefined;
