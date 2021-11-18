import { buildFacetChildren } from '../';
import { mockFacets } from 'tests/__fixtures__/products';

describe('buildFacetChildren()', () => {
  it('should return undefined when a facet has no children', () => {
    expect(buildFacetChildren(mockFacets, mockFacets[0].id)).toBeUndefined();
  });

  it('should find the children and have only one', () => {
    const expectedResult = [
      {
        ...mockFacets[3],
        children: undefined,
      },
    ];

    expect(buildFacetChildren(mockFacets, mockFacets[2].id)).toEqual(
      expectedResult,
    );
  });

  it('should find the children and have two', () => {
    const mockFacetWithParent = {
      id: 'categories_123',
      parentId: 'categories_136484',
    };
    const mockFacetsWithMultipleChildren = [...mockFacets, mockFacetWithParent];
    const expectedResult = [
      {
        ...mockFacets[3],
        children: [
          {
            ...mockFacetWithParent,
            children: undefined,
          },
        ],
      },
    ];

    expect(
      buildFacetChildren(mockFacetsWithMultipleChildren, mockFacets[2].id),
    ).toEqual(expectedResult);
  });
});
