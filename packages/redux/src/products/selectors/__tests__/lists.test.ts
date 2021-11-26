import * as fromReducer from '../../reducer/lists';
import * as selectors from '../lists';
import {
  mockBreadCrumbs,
  mockFacets,
  mockGroupedEntries,
  mockProductsListHash,
  mockProductsListHashWithPageIndexParameter,
  mockProductsListNormalizedPayload,
  mockProductsState,
  mockSetId,
} from 'tests/__fixtures__/products';
import cloneDeep from 'lodash/cloneDeep';

beforeEach(jest.clearAllMocks);

describe('products list redux selectors', () => {
  describe('isProductsListLoading()', () => {
    const spy = jest.spyOn(fromReducer, 'getIsLoading');

    it('should get the loading status of a given products list', () => {
      expect(
        selectors.isProductsListLoading(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the loading status of a given products list - hash is a number', () => {
      expect(
        selectors.isProductsListLoading(mockProductsState, mockSetId),
      ).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the loading status of a given products list - without hash', () => {
      expect(selectors.isProductsListLoading(mockProductsState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isProductsListFetched()', () => {
    it('should get the set fetched status of a given products list', () => {
      expect(
        selectors.isProductsListFetched(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(true);
    });

    it('should get the set fetched status of a given products list - hash is a number', () => {
      expect(
        selectors.isProductsListFetched(mockProductsState, mockSetId),
      ).toBe(false);
    });

    it('should get the set fetched status of a given products list - without hash', () => {
      expect(selectors.isProductsListFetched(mockProductsState)).toBe(true);
    });
  });

  describe('getProductsListError()', () => {
    const expectedResult =
      mockProductsState.products.lists.error[mockProductsListHash];
    const spy = jest.spyOn(fromReducer, 'getError');

    it('should get the products list error property from state', () => {
      expect(
        selectors.getProductsListError(mockProductsState, mockProductsListHash),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the products list error property from state - hash is a number', () => {
      expect(
        selectors.getProductsListError(mockProductsState, mockSetId),
      ).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the products list error property from state - without hash', () => {
      expect(selectors.getProductsListError(mockProductsState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isProductsListHydrated()', () => {
    const spy = jest.spyOn(fromReducer, 'getIsHydrated');

    it('should get the products list hydrated status', () => {
      expect(
        selectors.isProductsListHydrated(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the products list hydrated status - hash is a number', () => {
      expect(
        selectors.isProductsListHydrated(mockProductsState, mockSetId),
      ).toBeUndefined();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the products list hydrated status - without hash', () => {
      expect(selectors.isProductsListHydrated(mockProductsState)).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductsListProductsIds()', () => {
    const expectedResult =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].products.entries;

    it('should get the products ids from a products list', () => {
      expect(
        selectors.getProductsListProductsIds(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(expectedResult);
    });

    it('should get the products ids from a products list without hash', () => {
      expect(selectors.getProductsListProductsIds(mockProductsState)).toBe(
        expectedResult,
      );
    });
  });

  describe('getProductsListResult()', () => {
    const expectedResult =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ];

    it('should get the result of a given products list', () => {
      expect(
        selectors.getProductsListResult(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the result of a given products list without hash', () => {
      expect(selectors.getProductsListResult(mockProductsState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getProductsListProducts()', () => {
    const expectedResult = [
      { id: 12913172, shortDescription: 'foo' },
      {
        id: 12913174,
        shortDescription: 'bar',
        groupedEntries: mockGroupedEntries,
      },
    ];

    it('should get the products from a products list', () => {
      expect(
        selectors.getProductsListProducts(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the products from a products list without hash', () => {
      expect(selectors.getProductsListProducts(mockProductsState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getProductsListProductsFromAllPages()', () => {
    const expectedResult = [
      mockProductsListNormalizedPayload.entities.products[12913172],
      mockProductsListNormalizedPayload.entities.products[12913174],
      mockProductsListNormalizedPayload.entities.products[12913172],
      mockProductsListNormalizedPayload.entities.products[12913174],
    ];

    it('should return an empty array if there are no `productsLists', () => {
      expect(
        selectors.getProductsListProductsFromAllPages(
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
        selectors.getProductsListProductsFromAllPages(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the products from all pages, without receiving a hash', () => {
      expect(
        selectors.getProductsListProductsFromAllPages(mockProductsState),
      ).toEqual(expectedResult);
    });

    it('should get the products from all pages, when receiving a hash that ends with the page index parameter', () => {
      expect(
        selectors.getProductsListProductsFromAllPages(
          mockProductsState,
          mockProductsListHashWithPageIndexParameter,
        ),
      ).toEqual([expectedResult[0], expectedResult[1]]);
    });
  });

  describe('getProductsListPagination()', () => {
    const expectedResult = {
      number: 1,
      pageSize: 20,
      totalItems: 40,
      totalPages: 2,
    };

    it('should get the pagination', () => {
      expect(
        selectors.getProductsListPagination(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should get the pagination without hash', () => {
      expect(selectors.getProductsListPagination(mockProductsState)).toEqual(
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
          lists: {},
        },
      };

      expect(
        selectors.getProductsListPagination(
          mockStateWithoutLists,
          mockProductsListHash,
        ),
      ).toBeUndefined();
    });
  });

  describe('getProductsListBreadcrumbs()', () => {
    it('should get the breadCrumbs', () => {
      expect(
        selectors.getProductsListBreadcrumbs(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(mockBreadCrumbs);
    });

    it('should get the breadCrumbs without hash', () => {
      expect(selectors.getProductsListBreadcrumbs(mockProductsState)).toEqual(
        mockBreadCrumbs,
      );
    });
  });

  describe('isProductsListCached()', () => {
    it('should return true if a products list result is cached', () => {
      expect(
        selectors.isProductsListCached(mockProductsState, mockProductsListHash),
      ).toBe(true);
    });

    it('should return true if a products list result is cached - without hash', () => {
      expect(selectors.isProductsListCached(mockProductsState)).toBe(true);
    });

    it('should return false if a products list result is not cached', () => {
      expect(selectors.isProductsListCached(mockProductsState, 'foo')).toBe(
        false,
      );
    });
  });

  describe('getProductsListActiveFilters()', () => {
    it('should return undefined if there is no available products list', () => {
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
        selectors.getProductsListActiveFilters(mockStateWithoutHash),
      ).toBeUndefined();
    });

    it('should return the respective active filters', () => {
      const expectedResult = {
        categories: [136003],
        colors: [6, 12],
        gender: [0],
        sizes: [22],
      };

      expect(
        selectors.getProductsListActiveFilters(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });

    it('should return the respective active filters without hash', () => {
      const expectedResult = {
        categories: [136003],
        colors: [6, 12],
        gender: [0],
        sizes: [22],
      };

      expect(selectors.getProductsListActiveFilters(mockProductsState)).toEqual(
        expectedResult,
      );
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
              filterSegments: [
                {
                  order: 0,
                  type: 10,
                  key: 'discount',
                  gender: null,
                  value: 0,
                  valueUpperBound: 0,
                  fromQueryString: true,
                },
                {
                  order: 0,
                  type: 10,
                  key: 'discount',
                  gender: null,
                  value: 30,
                  valueUpperBound: 50,
                  fromQueryString: true,
                },
              ],
            },
          },
        },
      };

      expect(
        selectors.getProductsListActiveFilters(mockStateWithoutHash),
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
              filterSegments: [
                {
                  order: 0,
                  type: 10,
                  key: 'price',
                  gender: null,
                  value: 0,
                  valueUpperBound: 1200,
                  fromQueryString: true,
                },
              ],
            },
          },
        },
      };

      expect(
        selectors.getProductsListActiveFilters(mockStateWithoutHash),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductsListSelectedFiltersCount()', () => {
    it('should return undefined if there is no available products list', () => {
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
        selectors.getProductsListSelectedFiltersCount(mockStateWithoutHash),
      ).toBeUndefined();
    });

    it('should return the count of the selected filters', () => {
      expect(
        selectors.getProductsListSelectedFiltersCount(
          mockProductsState,
          mockProductsListHash,
        ),
      ).toBe(4);
    });

    it('should return the count of the selected filters without hash', () => {
      expect(
        selectors.getProductsListSelectedFiltersCount(mockProductsState),
      ).toBe(4);
    });
  });

  describe('getProductsListHash()', () => {
    it('should get the products list hash property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getHash');
      const expectedResult = mockProductsState.products.lists.hash;

      expect(selectors.getProductsListHash(mockProductsState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductsListSort()', () => {
    const productsList =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ];
    const expectedResult = {
      sort: productsList.config.sort,
      sortDirection: productsList.config.sortDirection,
    };

    it('should get the products list sort', () => {
      expect(
        selectors.getProductsListSort(mockProductsState, mockProductsListHash),
      ).toEqual(expectedResult);
    });

    it('should get the products list sort without hash', () => {
      expect(selectors.getProductsListSort(mockProductsState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getProductsListFacetsGroupsByType()', () => {
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
        selectors.getProductsListFacetsGroupsByType(
          mockProductsState,
          mockFacetGroup1.type,
        ),
      ).toEqual(expectedResult);
    });

    it('should return undefined if products list results are not available', () => {
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
        selectors.getProductsListFacetsGroupsByType(
          mockStateNoListAvailableForHash,
          mockFacetGroup1.type,
        ),
      ).toBeUndefined();
    });

    it('should get all the facet groups belonging to a specific type with hash', () => {
      const expectedResult = [mockFacetGroup1, mockFacetGroup2];

      expect(
        selectors.getProductsListFacetsGroupsByType(
          mockProductsState,
          mockFacetGroup1.type,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductsListFacetsByFacetGroupType()', () => {
    const mockFacet1 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[2].id];
    const mockFacet2 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[3].id];
    const mockFacetGroup =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].facetGroups[1];

    it('should get all the facets belonging to a specific type', () => {
      const expectedResult = [mockFacet1, mockFacet2];

      expect(
        selectors.getProductsListFacetsByFacetGroupType(
          mockProductsState,
          mockFacetGroup.type,
        ),
      ).toEqual(expectedResult);
    });

    it('should return undefined if there are no facet groups for specific type provided', () => {
      const state = cloneDeep(mockProductsState);

      state.entities.productsLists[
        mockProductsListHash
      ].facetGroups[0].type = 5;
      state.entities.productsLists[
        mockProductsListHash
      ].facetGroups[1].type = 5;

      expect(
        selectors.getProductsListFacetsByFacetGroupType(
          state,
          mockFacetGroup.type,
        ),
      ).toBeUndefined();
    });

    it('should return undefined if no products list results are available', () => {
      const state = cloneDeep(mockProductsState);

      state.products.lists.hash = 'foo';

      expect(
        selectors.getProductsListFacetsByFacetGroupType(
          state,
          mockFacetGroup.type,
        ),
      ).toBeUndefined();
    });

    it('should get all the facets belonging to a specific type with hash', () => {
      const expectedResult = [mockFacet1, mockFacet2];

      expect(
        selectors.getProductsListFacetsByFacetGroupType(
          mockProductsState,
          mockFacetGroup.type,
          mockProductsListHash,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getHierarchicalFacetsWithChildren()', () => {
    const mockFacet1 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[2].id];
    const mockFacet2 =
      mockProductsListNormalizedPayload.entities.facets[mockFacets[3].id];
    const mockFacetGroup =
      mockProductsListNormalizedPayload.entities.productsLists[
        mockProductsListHash
      ].facetGroups[1];

    it('should get the all the hierarchical facets with children', () => {
      expect(
        selectors.getHierarchicalFacetsWithChildren(
          mockProductsState,
          mockFacetGroup.type,
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
      state.entities.productsLists[
        mockProductsListHash
      ].facetGroups[0].type = 5;
      state.entities.productsLists[
        mockProductsListHash
      ].facetGroups[1].type = 5;

      expect(
        selectors.getHierarchicalFacetsWithChildren(state, mockFacetGroup.type),
      ).toBeUndefined();
    });

    it('should return undefined if no products list results are available', () => {
      const state = cloneDeep(mockProductsState);

      state.products.lists.hash = 'foo';

      expect(
        selectors.getHierarchicalFacetsWithChildren(state, mockFacetGroup.type),
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
          mockFacetGroupFormatMultiple.type,
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
          id: mockRepeatedFacetId,
          parentId: mockRepeatedFacetId,
          slug: 'shoes',
          url: 'shoes',
          value: 136301,
          valueUpperBound: 0,
        },
      };
      const mockFacetGroupWrongData = [
        {
          deep: 1,
          description: 'Categories',
          format: 'hierarchical',
          key: 'categories',
          type: 6,
          values: [[mockRepeatedFacetId]],
        },
      ];

      state.entities.facets = mockFacetsWrongData;
      state.entities.productsLists[mockProductsListHash].facetGroups =
        mockFacetGroupWrongData;

      const result = selectors.getHierarchicalFacetsWithChildren(
        state,
        mockFacetGroupWrongData[0].type,
      );

      expect(result).toEqual([mockFacetsWrongData.categories_0]);
      expect(result[0].children).toBeUndefined();
    });

    describe('`hash` param', () => {
      it('should get the all the hierarchical facets with children for the given `hash`', () => {
        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockProductsState,
            mockFacetGroup.type,
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
            mockFacetGroup.type,
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
            mockFacetGroup.type,
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
            mockFacetGroup.type,
            { dynamic: 9999 },
          ),
        ).toBeUndefined();
      });

      it('should return the all the hierarchical facets for a given `dynamic`', () => {
        const mockDynamic = 1;
        const mockFacet = {
          description: 'Jackets',
          groupsOn: 0,
          id: 'categories_136335',
          parentId: 'categories_136330',
          slug: 'clothing-jackets',
          url: 'clothing-jackets',
          value: 136335,
          valueUpperBound: 0,
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
                id: 'categories_136330',
                parentId: 'categories_0',
                slug: 'clothing',
                url: 'clothing',
                value: 136330,
                valueUpperBound: 0,
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
                    format: 'hierarchical',
                    key: 'categories',
                    type: 6,
                    values: [[mockFacet.id]],
                  },
                ],
              },
            },
          },
        };

        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockState,
            mockFacetGroup.type,
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
});
