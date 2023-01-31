import { getFacet, getFacets, getFacetsByIds } from '..';
import { mockFacets } from 'tests/__fixtures__/products';

const mockFacetId = mockFacets[0].id;
const mockFacet = mockFacets[0];

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
          6234412: {
            value: 2,
            description: 'WHITE',
            url: '?colors=2',
          },
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
          6234412: {
            value: 2,
            description: 'WHITE',
            url: '?colors=2',
          },
          6785412: {
            value: 3,
            description: 'RED',
            url: '?colors=3',
          },
        },
      },
    };

    expect(getFacetsByIds(state, [6234412, mockFacetId])).toEqual([
      state.entities.facets[6234412],
      state.entities.facets[mockFacetId],
    ]);
  });
});
