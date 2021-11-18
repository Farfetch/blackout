import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import {
  mockBreadCrumbs,
  mockFacets,
  mockGroupedEntries,
  mockListingHash,
  mockListingNormalizedPayload,
  mockListingState,
} from 'tests/__fixtures__/products';
import cloneDeep from 'lodash/cloneDeep';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('product listing redux selectors', () => {
  describe('isListingLoading()', () => {
    it('should get the loading status of a given listing', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(
        selectors.isListingLoading(mockListingState, mockListingHash),
      ).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the loading status of a given listing without hash', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isListingLoading(mockListingState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isNextListingLoading()', () => {
    describe('when listing is loading', () => {
      const mockStateLoadingListing = {
        listing: {
          isLoading: { [mockListingHash]: true },
          hash: mockListingHash,
        },
        entities: { ...mockListingNormalizedPayload.entities },
      };

      it('should get the loading status of the next listing', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(
          selectors.isNextListingLoading(
            mockStateLoadingListing,
            mockListingHash,
          ),
        ).toEqual(true);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should get the loading status of the next listing without hash', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(selectors.isNextListingLoading(mockStateLoadingListing)).toEqual(
          true,
        );
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when listing is not loading', () => {
      it('should get the loading status of the next listing', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(
          selectors.isNextListingLoading(mockListingState, mockListingHash),
        ).toEqual(false);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should get the loading status of the next listing without hash', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(selectors.isNextListingLoading(mockListingState)).toEqual(false);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('isInfiniteListingLoading()', () => {
    describe('when listing is loading', () => {
      const mockStateLoadingListing = {
        listing: {
          isLoading: { [mockListingHash]: true },
          hash: mockListingHash,
        },
        entities: mockListingNormalizedPayload.entities,
      };

      it('should get the loading status of an infinite listing', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(
          selectors.isInfiniteListingLoading(
            mockStateLoadingListing,
            mockListingHash,
          ),
        ).toEqual(false);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should get the loading status of an infinite listing without hash', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(
          selectors.isInfiniteListingLoading(mockStateLoadingListing),
        ).toEqual(false);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when listing is not loading', () => {
      it('should get the loading status of an infinite listing', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(
          selectors.isInfiniteListingLoading(mockListingState, mockListingHash),
        ).toEqual(false);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should get the loading status of an infinite listing without hash', () => {
        const spy = jest.spyOn(fromReducer, 'getIsLoading');

        expect(selectors.isInfiniteListingLoading(mockListingState)).toEqual(
          false,
        );
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getListingError()', () => {
    it('should get the listing error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockListingState.listing.error[mockListingHash];

      expect(selectors.getListingError(mockListingState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isListingHydrated()', () => {
    it('should get the listing hydrated status', () => {
      const spy = jest.spyOn(fromReducer, 'getIsHydrated');

      expect(
        selectors.isListingHydrated(mockListingState, mockListingHash),
      ).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should get the listing hydrated status without hash', () => {
      const spy = jest.spyOn(fromReducer, 'getIsHydrated');

      expect(selectors.isListingHydrated(mockListingState)).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getListingProductsIds()', () => {
    it('should get the products ids from a listing', () => {
      expect(selectors.getListingProductsIds(mockListingState)).toBe(
        mockListingNormalizedPayload.entities.searchResults[mockListingHash]
          .products.entries,
      );
    });
  });

  describe('getListingResult()', () => {
    it('should get the result of a given listing', () => {
      expect(
        selectors.getListingResult(mockListingState, mockListingHash),
      ).toEqual(
        mockListingNormalizedPayload.entities.searchResults[mockListingHash],
      );
    });
    it('should get the result of a given listing without hash', () => {
      expect(selectors.getListingResult(mockListingState)).toEqual(
        mockListingNormalizedPayload.entities.searchResults[mockListingHash],
      );
    });
  });

  describe('getListingProducts()', () => {
    it('should get the products from a listing', () => {
      const expectedResult = [
        { id: 12913172, shortDescription: 'foo' },
        {
          id: 12913174,
          shortDescription: 'bar',
          groupedEntries: mockGroupedEntries,
        },
      ];

      expect(selectors.getListingProducts(mockListingState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getListingPagination()', () => {
    it('should get the pagination', () => {
      const expectedResult = {
        number: 1,
        pageSize: 20,
        totalItems: 40,
        totalPages: 2,
      };

      expect(selectors.getListingPagination(mockListingState)).toEqual(
        expectedResult,
      );
    });

    it('should return undefined if there is no result', () => {
      const mockStateWithoutListing = {
        entities: {},
        listing: {},
      };
      expect(
        selectors.getListingPagination(mockStateWithoutListing),
      ).toBeUndefined();
    });
  });

  describe('getListingmockB)', () => {
    it('should get the breadCrumbs', () => {
      expect(selectors.getListingBreadcrumbs(mockListingState)).toEqual(
        mockBreadCrumbs,
      );
    });
  });

  describe('getListingGroupedEntries()', () => {
    it('should get the color grouping', () => {
      const expectedResult = {
        totalItems: mockGroupedEntries.totalItems,
        remaining:
          mockGroupedEntries.totalItems - mockGroupedEntries.entries.length,
        entries: mockGroupedEntries.entries,
      };

      expect(
        selectors.getListingGroupedEntries(mockListingState, 12913174),
      ).toEqual(expectedResult);
    });

    it('should return undefined when the product does not have color grouping', () => {
      expect(
        selectors.getListingGroupedEntries(mockListingState, 12913172),
      ).toBeUndefined();
    });
  });

  describe('getRedirectUrl()', () => {
    it('should get the url', () => {
      const expectedResult = '/en-pt/awesome-url-123';

      expect(selectors.getRedirectUrl(mockListingState)).toEqual(
        expectedResult,
      );
    });

    it('should return undefined when the listing does not have a redirect url', () => {
      expect(
        selectors.getRedirectUrl(
          {
            listing: {
              result: {},
            },
            entities: {
              [mockListingHash]: {},
            },
          },
          mockListingHash,
        ),
      ).toBeUndefined();
    });
  });

  describe('isListingInCache()', () => {
    it('should return true if a listing result is cached', () => {
      expect(
        selectors.isListingInCache(mockListingState, mockListingHash),
      ).toBe(true);
    });

    it('should return false if a listing result is not cached', () => {
      expect(selectors.isListingInCache(mockListingState, 'foo')).toBe(false);
    });
  });

  describe('getListingActiveFilters()', () => {
    it('should return undefined if there is no available listing', () => {
      const mockStateWithoutHash = {
        ...mockListingState,
        listing: {
          ...mockListingState.listing,
          hash: null,
        },
      };
      expect(
        selectors.getListingActiveFilters(mockStateWithoutHash),
      ).toBeUndefined();
    });

    it('should return the respective active filters', () => {
      const expectedResult = {
        categories: [136003],
        colors: [6, 12],
        gender: [0],
        sizes: [22],
      };

      expect(selectors.getListingActiveFilters(mockListingState)).toEqual(
        expectedResult,
      );
    });

    it('should return the respective active filters with discount values', () => {
      const expectedResult = {
        discount: [0, '30-50'],
      };
      const mockStateWithoutHash = {
        ...mockListingState,
        entities: {
          searchResults: {
            [mockListingHash]: {
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

      expect(selectors.getListingActiveFilters(mockStateWithoutHash)).toEqual(
        expectedResult,
      );
    });

    it('should return the respective active filters with range values', () => {
      const expectedResult = {
        price: [0, 1200],
      };
      const mockStateWithoutHash = {
        ...mockListingState,
        entities: {
          searchResults: {
            [mockListingHash]: {
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

      expect(selectors.getListingActiveFilters(mockStateWithoutHash)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getListingActiveFiltersCount()', () => {
    it('should return undefined if there is no available listing', () => {
      const mockStateWithoutHash = {
        ...mockListingState,
        listing: {
          ...mockListingState.listing,
          hash: null,
        },
      };
      expect(
        selectors.getListingActiveFiltersCount(mockStateWithoutHash),
      ).toBeUndefined();
    });

    it('should return the count of the active filters', () => {
      expect(selectors.getListingActiveFiltersCount(mockListingState)).toBe(3);
    });
  });

  describe('getListingSelectedFiltersCount()', () => {
    it('should return undefined if there is no available listing', () => {
      const mockStateWithoutHash = {
        ...mockListingState,
        listing: {
          ...mockListingState.listing,
          hash: null,
        },
      };
      expect(
        selectors.getListingSelectedFiltersCount(mockStateWithoutHash),
      ).toBeUndefined();
    });

    it('should return the count of the selected filters', () => {
      expect(selectors.getListingSelectedFiltersCount(mockListingState)).toBe(
        4,
      );
    });
  });

  describe('getListingHash()', () => {
    it('should get the listing hash property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getHash');
      const expectedResult = mockListingState.listing.hash;

      expect(selectors.getListingHash(mockListingState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getListingSort()', () => {
    it('should get the listing sort', () => {
      const listing =
        mockListingNormalizedPayload.entities.searchResults[mockListingHash];
      const expectedResult = {
        sort: listing.config.sort,
        sortDirection: listing.config.sortDirection,
      };

      expect(selectors.getListingSort(mockListingNormalizedPayload)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getFacetsGroupsByType()', () => {
    const mockFacetGroup1 =
      mockListingNormalizedPayload.entities.searchResults[mockListingHash]
        .facetGroups[0];
    const mockFacetGroup2 =
      mockListingNormalizedPayload.entities.searchResults[mockListingHash]
        .facetGroups[1];

    it('should get all the facet groups belonging to a specific type', () => {
      const expectedResult = [mockFacetGroup1, mockFacetGroup2];
      expect(
        selectors.getFacetsGroupsByType(mockListingState, mockFacetGroup1.type),
      ).toEqual(expectedResult);
    });

    it('should return undefined if listing results are not available', () => {
      const mockStateNoListingAvailableForHash = {
        ...mockListingState,
        listing: {
          ...mockListingState.listing,
          hash: 'foo',
        },
      };

      expect(
        selectors.getFacetsGroupsByType(
          mockStateNoListingAvailableForHash,
          mockFacetGroup1.type,
        ),
      ).toBeUndefined();
    });

    it('should get all the facet groups belonging to a specific type with hash', () => {
      const expectedResult = [mockFacetGroup1, mockFacetGroup2];
      expect(
        selectors.getFacetsGroupsByType(
          mockListingState,
          mockFacetGroup1.type,
          mockListingHash,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getFacetsByFacetGroupType()', () => {
    const mockFacet1 =
      mockListingNormalizedPayload.entities.facets[mockFacets[2].id];
    const mockFacet2 =
      mockListingNormalizedPayload.entities.facets[mockFacets[3].id];
    const mockFacetGroup =
      mockListingNormalizedPayload.entities.searchResults[mockListingHash]
        .facetGroups[1];

    it('should get all the facets belonging to a specific type', () => {
      const expectedResult = [mockFacet1, mockFacet2];

      expect(
        selectors.getFacetsByFacetGroupType(
          mockListingState,
          mockFacetGroup.type,
        ),
      ).toEqual(expectedResult);
    });

    it('should return undefined if there are no facet groups for specific type provided', () => {
      const state = cloneDeep(mockListingState);
      state.entities.searchResults[mockListingHash].facetGroups[0].type = 5;
      state.entities.searchResults[mockListingHash].facetGroups[1].type = 5;

      expect(
        selectors.getFacetsByFacetGroupType(state, mockFacetGroup.type),
      ).toBeUndefined();
    });

    it('should return undefined if no listing results are available', () => {
      const state = cloneDeep(mockListingState);
      state.listing.hash = 'foo';

      expect(
        selectors.getFacetsByFacetGroupType(state, mockFacetGroup.type),
      ).toBeUndefined();
    });

    it('should get all the facets belonging to a specific type with hash', () => {
      const expectedResult = [mockFacet1, mockFacet2];
      expect(
        selectors.getFacetsByFacetGroupType(
          mockListingState,
          mockFacetGroup.type,
          mockListingHash,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getHierarchicalFacetsWithChildren()', () => {
    const mockFacet1 =
      mockListingNormalizedPayload.entities.facets[mockFacets[2].id];
    const mockFacet2 =
      mockListingNormalizedPayload.entities.facets[mockFacets[3].id];
    const mockFacetGroup =
      mockListingNormalizedPayload.entities.searchResults[mockListingHash]
        .facetGroups[1];

    it('should get the all the hierarchical facets with children', () => {
      expect(
        selectors.getHierarchicalFacetsWithChildren(
          mockListingState,
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
      const state = cloneDeep(mockListingState);
      state.entities.searchResults[mockListingHash].facetGroups[0].type = 5;
      state.entities.searchResults[mockListingHash].facetGroups[1].type = 5;

      expect(
        selectors.getHierarchicalFacetsWithChildren(state, mockFacetGroup.type),
      ).toBeUndefined();
    });

    it('should return undefined if no listing results are available', () => {
      const state = cloneDeep(mockListingState);

      state.listing.hash = 'foo';

      expect(
        selectors.getHierarchicalFacetsWithChildren(state, mockFacetGroup.type),
      ).toBeUndefined();
    });

    it('should return undefined if the format is not hierarchical', () => {
      const mockFacetGroupFormatMultiple =
        mockListingNormalizedPayload.entities.searchResults[mockListingHash]
          .facetGroups[2];

      expect(
        selectors.getHierarchicalFacetsWithChildren(
          mockListingState,
          mockFacetGroupFormatMultiple.type,
        ),
      ).toBeUndefined();
    });

    it('should return the facet with no children if the `parent_id` is the same as the `id`', () => {
      const state = cloneDeep(mockListingState);
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
      state.entities.searchResults[mockListingHash].facetGroups =
        mockFacetGroupWrongData;

      const result = selectors.getHierarchicalFacetsWithChildren(
        state,
        mockFacetGroupWrongData[0].type,
      );

      expect(result).toEqual([mockFacetsWrongData.categories_0]);
      expect(result[0].children).toBeUndefined();
    });

    it('should get the all the hierarchical facets with children with hash', () => {
      expect(
        selectors.getHierarchicalFacetsWithChildren(
          mockListingState,
          mockFacetGroup.type,
          mockListingHash,
        ),
      ).toEqual([
        {
          children: [mockFacet2],
          ...mockFacet1,
        },
      ]);
    });

    describe('`initialDepth` param', () => {
      it('should get all the hierarchical facets starting on `initialDepth`', () => {
        expect(
          selectors.getHierarchicalFacetsWithChildren(
            mockListingState,
            mockFacetGroup.type,
            mockListingHash,
            2,
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
            mockListingState,
            mockFacetGroup.type,
            mockListingHash,
            3,
          ),
        ).toEqual([
          {
            children: undefined,
            ...mockFacet2,
          },
        ]);
      });
    });

    it('should get the all the hierarchical facets for a given `dynamic`', () => {
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
      const mockListingNewState = {
        ...mockListingState,
        entities: {
          ...mockListingState.entities,
          facets: {
            ...mockListingState.entities.facets,
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
          searchResults: {
            [mockListingHash]: {
              ...mockListingState.entities.searchResults[[mockListingHash]],
              facetGroups: [
                ...mockListingState.entities.searchResults[[mockListingHash]]
                  .facetGroups,
                {
                  deep: 1,
                  description: 'Categories',
                  dynamic: 1,
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
          mockListingNewState,
          mockFacetGroup.type,
          undefined,
          undefined,
          1,
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
