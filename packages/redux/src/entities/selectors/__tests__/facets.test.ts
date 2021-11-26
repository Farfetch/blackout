import { getFacet, getFacets, getFacetsByIds } from '..';
import { mockFacets } from 'tests/__fixtures__/products';

const mockFacet = mockFacets[0];
const mockFacet1 = mockFacets[1];
const mockFacet2 = mockFacets[2];
const mockFacetId = mockFacet.id;
const mockFacetId1 = mockFacet1.id;
const mockFacetId2 = mockFacet2.id;

describe('getFacet()', () => {
  it('should return the facet entity', () => {
    const state = {
      entities: {
        facets: {
          [mockFacetId]: mockFacet,
        },
      },
    };

    expect(getFacet(state, mockFacetId)).toEqual(mockFacet);
  });
});

describe('getFacets()', () => {
  it('should return all the facets entities', () => {
    const state = {
      entities: {
        facets: {
          [mockFacetId]: mockFacet,
          [mockFacetId1]: mockFacet1,
        },
      },
    };

    expect(getFacets(state)).toEqual(state.entities.facets);
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

    expect(getFacetsByIds(state, [mockFacetId, mockFacetId2])).toEqual([
      state.entities.facets[mockFacetId],
      state.entities.facets[mockFacetId2],
    ]);
  });
});
