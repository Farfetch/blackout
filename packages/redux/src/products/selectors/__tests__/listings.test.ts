import * as fromReducer from '../../reducer/lists.js';
import * as selectors from '../listings.js';
import { cloneDeep } from 'lodash-es';
import {
  FacetGroupFormat,
  FacetGroupKey,
  FacetType,
} from '@farfetch/blackout-client';
import { mockBrandResponse } from 'tests/__fixtures__/brands/index.mjs';
import {
  mockBreadCrumbs,
  mockFacets,
  mockFacetsNormalized,
  mockGroupedEntries,
  mockProductsListDenormalizedFacetGroupsWithMultipleValues,
  mockProductsListHash,
  mockProductsListHashWithPageIndexParameter,
  mockProductsListNormalizedPayload,
  mockProductsState,
  mockProductsWithMultipleFacetGroupValuesState,
  mockSetId,
} from 'tests/__fixtures__/products/index.mjs';
import { mockCategory } from 'tests/__fixtures__/categories/index.mjs';

const mockFacetId = mockFacets[0]!.id;
const mockFacetId1 = mockFacets[1]!.id;
const mockFacetId2 = mockFacets[2]!.id;
const mockFacet = mockFacetsNormalized[mockFacetId];
const mockFacet1 = mockFacetsNormalized[mockFacetId1];
const mockFacet2 = mockFacetsNormalized[mockFacetId2];

beforeEach(jest.clearAllMocks);

describe('product listing redux selectors', () => {
  describe('isProductListingLoading()', () => {
    const spy = jest.spyOn(fromReducer, 'getIsLoading');

    it('should get the loading status of a given product listing', () => {
      expect(
        selectors.isProductListingLoading(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the loading status of a given product listing - hash is a number', () => {
      expect(
        selectors.isProductListingLoading(mockProductsState, mockSetId),
      ).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the loading status of a given product listing - without hash', () => {
      expect(selectors.isProductListingLoading(mockProductsState)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isProductListingFetched()', () => {
    it('should get the set fetched status of a given product listing', () => {
      expect(
        selectors.isProductListingFetched(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(true);
    });

    it('should get the set fetched status of a given product listing - hash is a number', () => {
      expect(
        selectors.isProductListingFetched(mockProductsState, mockSetId),
      ).toBe(false);
    });

    it('should get the set fetched status of a given product listing - without hash', () => {
      expect(selectors.isProductListingFetched(mockProductsState)).toBe(true);
    });
  });

  describe('getProductListingError()', () => {
    const expectedResult =
      mockProductsState.products.lists.error[mockProductsListHash];
    const spy = jest.spyOn(fromReducer, 'getError');

    it('should get the product listing error property from state', () => {
      expect(
        selectors.getProductListingError(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the product listing error property from state - hash is a number', () => {
      expect(
        selectors.getProductListingError(mockProductsState, mockSetId),
      ).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the product listing error property from state - without hash', () => {
      expect(selectors.getProductListingError(mockProductsState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isProductListingHydrated()', () => {
    const spy = jest.spyOn(fromReducer, 'getIsHydrated');

    it('should get the product listing hydrated status', () => {
      expect(
        selectors.isProductListingHydrated(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the product listing hydrated status - hash is a number', () => {
      expect(
        selectors.isProductListingHydrated(mockProductsState, mockSetId),
      ).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the product listing hydrated status - without hash', () => {
      expect(selectors.isProductListingHydrated(mockProductsState)).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductListingProductsIds()', () => {
    const expectedResult =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].products.entries;

    it('should get the products ids from a product listing', () => {
      expect(
        selectors.getProductListingProductsIds(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(expectedResult);
    });

    it('should get the products ids from a product listing without hash', () => {
      expect(selectors.getProductListingProductsIds(mockProductsState)).toBe(
        expectedResult,
      );
    });
  });

  describe('getProductListingResult()', () => {
    const expectedResult =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ];

    it('should get the result of a given product listing', () => {
      expect(
        selectors.getProductListingResult(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the result of a given product listing without hash', () => {
      expect(selectors.getProductListingResult(mockProductsState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getProductListingProducts()', () => {
    const expectedResult = [
      {
        id: 12913172,
        shortDescription: 'foo',
        brand: mockBrandResponse,
        categories: [mockCategory],
      },
      {
        id: 12913174,
        shortDescription: 'bar',
        brand: mockBrandResponse,
        categories: [mockCategory],
        groupedEntries: mockGroupedEntries,
      },
    ];

    it('should get the products from a product listing', () => {
      expect(
        selectors.getProductListingProducts(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the products from a product listing without hash', () => {
      expect(selectors.getProductListingProducts(mockProductsState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getProductListingProductsFromAllPages()', () => {
    const expectedResult = [
      {
        ...mockProductsListNormalizedPayload.entities.products[12913172],
        brand: mockBrandResponse,
        categories: [mockCategory],
      },
      {
        ...mockProductsListNormalizedPayload.entities.products[12913174],
        brand: mockBrandResponse,
        categories: [mockCategory],
      },
      {
        ...mockProductsListNormalizedPayload.entities.products[12913172],
        brand: mockBrandResponse,
        categories: [mockCategory],
      },
      {
        ...mockProductsListNormalizedPayload.entities.products[12913174],
        brand: mockBrandResponse,
        categories: [mockCategory],
      },
    ];

    it('should return an empty array if there are no `productsLists', () => {
      expect(
        selectors.getProductListingProductsFromAllPages(
          {
            ...mockProductsState,
            entities: {
              ...mockProductsState.entities,
              productsLists: undefined,
            },
          },
          mockProductsListHash,
        ),
      ).toEqual([]);
    });

    it('should get the products from all pages, receiving a hash', () => {
      expect(
        selectors.getProductListingProductsFromAllPages(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the products from all pages, without receiving a hash', () => {
      expect(
        selectors.getProductListingProductsFromAllPages(mockProductsState),
      ).toEqual(expectedResult);
    });

    it('should get the products from all pages, when receiving a hash that ends with the page index parameter', () => {
      expect(
        selectors.getProductListingProductsFromAllPages(
          mockProductsState,
          mockProductsListHashWithPageIndexParameter,
        ),
      ).toEqual([expectedResult[0], expectedResult[1]]);
    });
  });

  describe('getProductListingPagination()', () => {
    const expectedResult = {
      number: 1,
      pageSize: 20,
      totalItems: 40,
      totalPages: 2,
    };

    it('should get the pagination', () => {
      expect(
        selectors.getProductListingPagination(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the pagination without hash', () => {
      expect(selectors.getProductListingPagination(mockProductsState)).toEqual(
        expectedResult,
      );
    });

    it('should return undefined if there is no result', () => {
      const mockStateWithoutLists = {
        ...mockProductsState,
        entities: {
          ...mockProductsState.entities,
          productsLists: undefined,
        },
        products: {
          ...mockProductsState.products,
          lists: {
            error: {},
            hash: '',
            isHydrated: {},
            isLoading: {},
            productListingFacets: {
              isLoading: false,
              error: null,
              result: [],
            },
          },
        },
      };

      expect(
        selectors.getProductListingPagination(
          mockStateWithoutLists,
          mockProductsListHash,
        ),
      ).toBeUndefined();
    });
  });

  describe('getProductListingBreadcrumbs()', () => {
    it('should get the breadCrumbs', () => {
      expect(
        selectors.getProductListingBreadcrumbs(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(mockBreadCrumbs);
    });

    it('should get the breadCrumbs without hash', () => {
      expect(selectors.getProductListingBreadcrumbs(mockProductsState)).toEqual(
        mockBreadCrumbs,
      );
    });
  });

  describe('isProductListingCached()', () => {
    it('should return true if a product listing result is cached', () => {
      expect(
        selectors.isProductListingCached(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(true);
    });

    it('should return true if a product listing result is cached - without hash', () => {
      expect(selectors.isProductListingCached(mockProductsState)).toBe(true);
    });

    it('should return false if a product listing result is not cached', () => {
      expect(selectors.isProductListingCached(mockProductsState, 'foo')).toBe(
        false,
      );
    });
  });

  describe('getProductListingActiveFilters()', () => {
    it('should return undefined if there is no available product listing', () => {
      const mockStateWithoutHash = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          lists: {
            ...mockProductsState.products.lists,
            hash: null,
          },
        },
      };

      expect(
        selectors.getProductListingActiveFilters(mockStateWithoutHash),
      ).toBeUndefined();
    });

    it('should return the respective active filters', () => {
      const expectedResult = {
        categories: [144307],
      };

      expect(
        selectors.getProductListingActiveFilters(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should return the respective active filters without hash', () => {
      const expectedResult = {
        categories: [144307],
      };

      expect(
        selectors.getProductListingActiveFilters(mockProductsState),
      ).toEqual(expectedResult);
    });

    it('should return the respective active filters with discount values', () => {
      const expectedResult = {
        discount: [0, '30-50'],
      };
      const mockStateWithoutHash = {
        ...mockProductsState,
        entities: {
          productsLists: {
            [mockProductsListHash]: {
              ...mockProductsState.entities.productsLists[mockProductsListHash],
              filterSegments: [
                {
                  order: 0,
                  type: 10,
                  key: 'discount',
                  gender: null,
                  value: 0,
                  valueUpperBound: 0,
                  fromQueryString: true,
                  slug: '',
                  description: '',
                  deep: 0,
                  parentId: 1,
                  negativeFilter: false,
                  facetId: '10',
                  prefixValue: '',
                },
                {
                  order: 0,
                  type: 10,
                  key: 'discount',
                  gender: null,
                  value: 30,
                  valueUpperBound: 50,
                  fromQueryString: true,
                  slug: '',
                  description: '',
                  deep: 0,
                  parentId: 1,
                  negativeFilter: false,
                  facetId: '20',
                  prefixValue: '',
                },
              ],
            },
          },
        },
      };

      expect(
        selectors.getProductListingActiveFilters(mockStateWithoutHash),
      ).toEqual(expectedResult);
    });

    it('should return the respective active filters with range values', () => {
      const expectedResult = {
        price: [0, 1200],
      };
      const mockStateWithoutHash = {
        ...mockProductsState,
        entities: {
          productsLists: {
            [mockProductsListHash]: {
              ...mockProductsState.entities.productsLists[mockProductsListHash],
              filterSegments: [
                {
                  order: 0,
                  type: 10,
                  key: 'price',
                  gender: null,
                  value: 0,
                  valueUpperBound: 1200,
                  fromQueryString: true,
                  slug: '',
                  description: '',
                  deep: 0,
                  parentId: 1,
                  negativeFilter: false,
                  facetId: '20',
                  prefixValue: '',
                },
              ],
            },
          },
        },
      };

      expect(
        selectors.getProductListingActiveFilters(mockStateWithoutHash),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductListingSelectedFiltersCount()', () => {
    it('should return undefined if there is no available product listing', () => {
      const mockStateWithoutHash = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          lists: {
            ...mockProductsState.products.lists,
            hash: null,
          },
        },
      };

      expect(
        selectors.getProductListingSelectedFiltersCount(mockStateWithoutHash),
      ).toBeUndefined();
    });

    it('should return the count of the selected filters', () => {
      expect(
        selectors.getProductListingSelectedFiltersCount(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(1);
    });

    it('should return the count of the selected filters without hash', () => {
      expect(
        selectors.getProductListingSelectedFiltersCount(mockProductsState),
      ).toBe(1);
    });
  });

  describe('getProductListingHash()', () => {
    it('should get the product listing hash property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getHash');
      const expectedResult = mockProductsState.products.lists.hash;

      expect(selectors.getProductListingHash(mockProductsState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductListingSort()', () => {
    const productsList =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ];
    const expectedResult = {
      sort: productsList.config.sort,
      sortDirection: productsList.config.sortDirection,
    };

    it('should get the product listing sort', () => {
      expect(
        selectors.getProductListingSort(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the product listing sort without hash', () => {
      expect(selectors.getProductListingSort(mockProductsState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getProductListingFacetsGroupsByType()', () => {
    const mockFacetGroup1 =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].facetGroups[0];
    const mockFacetGroup2 =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].facetGroups[1];

    it('should get all the facet groups belonging to a specific type', () => {
      const expectedResult = [mockFacetGroup1, mockFacetGroup2];

      expect(
        selectors.getProductListingFacetsGroupsByType(
          mockProductsState,
          mockFacetGroup1!.type,
        ),
      ).toEqual(expectedResult);
    });

    it('should return undefined if product listing results are not available', () => {
      const mockStateNoListAvailableForHash = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          lists: {
            ...mockProductsState.products.lists,
            hash: 'foo',
          },
        },
      };

      expect(
        selectors.getProductListingFacetsGroupsByType(
          mockStateNoListAvailableForHash,
          mockFacetGroup1!.type,
        ),
      ).toBeUndefined();
    });

    it('should get all the facet groups belonging to a specific type with hash', () => {
      const expectedResult = [mockFacetGroup1, mockFacetGroup2];

      expect(
        selectors.getProductListingFacetsGroupsByType(
          mockProductsState,
          mockFacetGroup1!.type,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductListingFacetsByFacetGroupType()', () => {
    const mockFacet1 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[0]!.id];
    const mockFacet2 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[1]!.id];
    const mockFacetGroup =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].facetGroups[1];

    it('should get all the facets belonging to a specific type', () => {
      const expectedResult = [mockFacet1, mockFacet2];

      expect(
        selectors.getProductListingFacetsByFacetGroupType(
          mockProductsState,
          mockFacetGroup!.type,
        ),
      ).toEqual(expectedResult);
    });

    it('should return undefined if there are no facet groups for specific type provided', () => {
      const state = cloneDeep(mockProductsState);

      state.entities.productsLists![
        mockProductsListHash
      ].facetGroups![0]!.type = 5;
      state.entities.productsLists![
        mockProductsListHash
      ].facetGroups![1]!.type = 5;

      expect(
        selectors.getProductListingFacetsByFacetGroupType(
          state,
          mockFacetGroup!.type,
        ),
      ).toBeUndefined();
    });

    it('should return undefined if no product listing results are available', () => {
      const state = cloneDeep(mockProductsState);

      state.products.lists.hash = 'foo';

      expect(
        selectors.getProductListingFacetsByFacetGroupType(
          state,
          mockFacetGroup!.type,
        ),
      ).toBeUndefined();
    });

    it('should get all the facets belonging to a specific type with hash', () => {
      const expectedResult = [mockFacet1, mockFacet2];

      expect(
        selectors.getProductListingFacetsByFacetGroupType(
          mockProductsState,
          mockFacetGroup!.type,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getHierarchicalFacetsWithChildren()', () => {
    const mockFacet1 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[0]!.id];
    const mockFacet2 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[1]!.id];
    const mockFacetGroup =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].facetGroups[1];

    it('should get the all the hierarchical facets with children', () => {
      expect(
        selectors.getHierarchicalFacetsWithChildren(
          mockProductsState,
          mockFacetGroup!.type,
        ),
      ).toEqual([
        {
          ...mockFacet1,
          children: [mockFacet2],
        },
      ]);
    });

    it('should return undefined if does not find facet groups belonging to the specific type', () => {
      const state = cloneDeep(mockProductsState);

      state.entities.productsLists![
        mockProductsListHash
      ]!.facetGroups![0]!.type = 5;
      state.entities.productsLists![
        mockProductsListHash
      ]!.facetGroups![1]!.type = 5;

      expect(
        selectors.getHierarchicalFacetsWithChildren(
          state,
          mockFacetGroup!.type,
        ),
      ).toBeUndefined();
    });

    it('should return undefined if no product listing results are available', () => {
      const state = cloneDeep(mockProductsState);

      state.products.lists.hash = 'foo';

      expect(
        selectors.getHierarchicalFacetsWithChildren(
          state,
          mockFacetGroup!.type,
        ),
      ).toBeUndefined();
    });

    it('should return undefined if the format is not hierarchical', () => {
      const mockFacetGroupFormatMultiple =
        mockProductsListNormalizedPayload.entities.productsLists[
          mockProductsListHash
        ].facetGroups[2];

      expect(
        selectors.getHierarchicalFacetsWithChildren(
          mockProductsState,
          mockFacetGroupFormatMultiple!.type,
        ),
      ).toBeUndefined();
    });

    it('should return the facet with no children if the `parent_id` is the same as the `id`', () => {
      const state = cloneDeep(mockProductsState);
      const mockRepeatedFacetId = 'categories_0';
      const mockFacetsWrongData = {
        [mockRepeatedFacetId]: {
          description: 'Shoes',
          groupsOn: 0,
          groupType: 6,
          id: mockRepeatedFacetId,
          parentId: mockRepeatedFacetId,
          slug: 'shoes',
          url: 'shoes',
          value: 136301,
          valueUpperBound: 0,
          _isDisabled: false,
          _isActive: false,
          count: 1,
        },
      };
      const mockFacetGroupWrongData = [
        {
          deep: 1,
          description: 'Categories',
          format: FacetGroupFormat.Hierarchical,
          key: FacetGroupKey.Categories,
          type: 6,
          values: [[mockRepeatedFacetId]],
          dynamic: 0,
          _clearUrl: '',
          _isClearHidden: false,
          _isClosed: false,
          order: 0,
          hash: '',
        },
      ];

      state.entities.facets = mockFacetsWrongData;
      state.entities.productsLists[mockProductsListHash].facetGroups =
        mockFacetGroupWrongData;

      const result = selectors.getHierarchicalFacetsWithChildren(
        state,
        mockFacetGroupWrongData[0]!.type,
      );

      expect(result).toEqual([mockFacetsWrongData.categories_0]);
      expect(result![0]!.children).toBeUndefined();
    });

    describe('`hash` param', () => {
      it('should get the all the hierarchical facets with children for the given `hash`', () => {
        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockProductsState,
            mockFacetGroup!.type,
            { hash: mockProductsListHash },
          ),
        ).toEqual([
          {
            children: [mockFacet2],
            ...mockFacet1,
          },
        ]);
      });
    });

    describe('`initialDepth` param', () => {
      it('should get all the hierarchical facets starting on `initialDepth`', () => {
        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockProductsState,
            mockFacetGroup!.type,
            { hash: mockProductsListHash, initialDepth: 2 },
          ),
        ).toEqual([
          {
            children: undefined,
            ...mockFacet2,
          },
        ]);
      });

      it('should get all the hierarchical facets when `initialDepth` is higher than the maximum depth', () => {
        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockProductsState,
            mockFacetGroup!.type,
            { hash: mockProductsListHash, initialDepth: 3 },
          ),
        ).toEqual([
          {
            children: undefined,
            ...mockFacet2,
          },
        ]);
      });
    });

    describe('`dynamic` param', () => {
      it('should return undefined if there are no facet groups of the given `dynamic`', () => {
        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockProductsState,
            mockFacetGroup!.type,
            { dynamic: 9999 },
          ),
        ).toBeUndefined();
      });

      it('should return the all the hierarchical facets for a given `dynamic`', () => {
        const mockDynamic = 1;
        const mockFacet = {
          description: 'Jackets',
          groupsOn: 0,
          groupType: 6,
          id: 'categories_136335',
          parentId: 'categories_136330',
          slug: 'clothing-jackets',
          url: 'clothing-jackets',
          value: 136335,
          valueUpperBound: 0,
          _isDisabled: false,
          _isActive: false,
          count: 1,
        };
        const mockState = {
          ...mockProductsState,
          entities: {
            ...mockProductsState.entities,

            facets: {
              ...mockProductsState.entities.facets,
              categories_136330: {
                description: 'Clothing',
                groupsOn: 0,
                groupType: 6,
                id: 'categories_136330',
                parentId: 'categories_0',
                slug: 'clothing',
                url: 'clothing',
                value: 136330,
                valueUpperBound: 0,
                _isDisabled: false,
                _isActive: false,
                count: 1,
              },
              [mockFacet.id]: mockFacet,
            },
            productsLists: {
              [mockProductsListHash]: {
                ...mockProductsState.entities.productsLists[
                  mockProductsListHash
                ],
                facetGroups: [
                  ...mockProductsState.entities.productsLists[
                    mockProductsListHash
                  ].facetGroups,
                  {
                    deep: 1,
                    description: 'Categories',
                    dynamic: mockDynamic,
                    format: FacetGroupFormat.Hierarchical,
                    key: FacetGroupKey.Categories,
                    type: 6,
                    values: [[mockFacet.id]],
                    _clearUrl: '',
                    _isClearHidden: false,
                    order: 0,
                    _isClosed: false,
                  },
                ],
              },
            },
          },
        };

        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockState,
            mockFacetGroup!.type,
            { dynamic: mockDynamic },
          ),
        ).toEqual([
          {
            children: undefined,
            ...mockFacet,
          },
        ]);
      });
    });
  });

  describe('getFacet()', () => {
    it('should return the facet entity', () => {
      expect(selectors.getFacet(mockProductsState, mockFacetId)).toEqual(
        mockFacet,
      );
    });
  });

  describe('getFacets()', () => {
    it('should return all the facets entities', () => {
      expect(selectors.getFacets(mockProductsState)).toEqual(
        mockProductsState.entities.facets,
      );
    });
  });

  describe('getFacetsByGroupType()', () => {
    it('should return all the facets of the passed group type', () => {
      const expectedResult = [
        mockProductsListNormalizedPayload.entities.facets[mockFacets[0]!.id],
        mockProductsListNormalizedPayload.entities.facets[mockFacets[1]!.id],
        mockProductsListNormalizedPayload.entities.facets[mockFacets[2]!.id],
      ];

      expect(
        selectors.getFacetsByGroupType(mockProductsState, FacetType.Categories),
      ).toEqual(expectedResult);
    });
  });

  describe('getFacetsByIds()', () => {
    it('should return all the facets corresponding to ids received', () => {
      const state = {
        entities: {
          facets: {
            [mockFacetId]: mockFacet,
            [mockFacetId1]: mockFacet1,
            [mockFacetId2]: mockFacet2,
          },
        },
      };

      expect(
        selectors.getFacetsByIds(mockProductsState, [
          mockFacetId,
          mockFacetId2,
        ]),
      ).toEqual([
        state.entities.facets[mockFacetId],
        state.entities.facets[mockFacetId2],
      ]);
    });
  });

  describe('getProductListingFacetGroups()', () => {
    it('should return all the facet groups correctly', () => {
      const expectedResult =
        mockProductsListDenormalizedFacetGroupsWithMultipleValues[
          mockProductsListHash
        ];

      expect(
        selectors.getProductListingFacetGroups(
          mockProductsWithMultipleFacetGroupValuesState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });
  });
});
