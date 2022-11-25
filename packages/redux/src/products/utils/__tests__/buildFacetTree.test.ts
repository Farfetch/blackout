import { buildFacetTree } from '..';
import { mockFacetsNormalized } from 'tests/__fixtures__/products';

const mockFacets = Object.values(mockFacetsNormalized);

describe('buildFacetTree()', () => {
  it('should return undefined when a facet has no children', () => {
    expect(buildFacetTree(mockFacets, mockFacets[2]!.id)).toBeUndefined();
  });

  it('should find the children and have only one', () => {
    const expectedResult = [
      {
        ...mockFacets[1],
        children: undefined,
      },
    ];

    expect(buildFacetTree(mockFacets, mockFacets[0]!.id)).toEqual(
      expectedResult,
    );
  });

  it('should find the children and have two', () => {
    const mockFacetWithParent = {
      ...mockFacets[1]!,
      id: 'categories_123',
      parentId: `${mockFacets[1]!.id}`,
    };
    const mockFacetsWithMultipleChildren = [...mockFacets, mockFacetWithParent];
    const expectedResult = [
      {
        ...mockFacets[1],
        children: [
          {
            ...mockFacetWithParent,
            children: undefined,
          },
        ],
      },
    ];

    expect(
      buildFacetTree(mockFacetsWithMultipleChildren, mockFacets[0]!.id),
    ).toEqual(expectedResult);
  });
});
