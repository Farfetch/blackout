import {
  type FacetGroup,
  FacetGroupFormat,
  FacetGroupKey,
} from '@farfetch/blackout-client';

export const mockListingFacetsQuery = { facets: ['sizesbycategory', 'brands'] };

export const mockListingFacets: FacetGroup[] = [
  {
    deep: 1,
    description: 'Categories',
    type: 6,
    values: [
      [
        {
          value: 144307,
          valueUpperBound: 0,
          description: 'Women',
          slug: 'women',
          url: 'women',
          parentId: 0,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 0,
          count: 13,
        },
        {
          value: 144308,
          valueUpperBound: 0,
          description: 'Women',
          slug: 'women',
          url: 'women',
          parentId: 0,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 0,
          count: 5,
        },
      ],
    ],
    order: 0,
    key: FacetGroupKey.Categories,
    format: FacetGroupFormat.Hierarchical,
    _clearUrl: null,
    _isClearHidden: false,
    _isClosed: false,
    dynamic: 0,
  },
];

export const mockListingFacetsValueNormalized = {
  deep: 1,
  description: 'Categories',
  type: 6,
  values: [['categories_144307', 'categories_144308']],
  order: 0,
  key: FacetGroupKey.Categories,
  format: FacetGroupFormat.Hierarchical,
  _clearUrl: null,
  _isClearHidden: false,
  _isClosed: false,
  dynamic: 0,
};

export const mockListingFacetsNormalizedResponse = {
  entities: {
    facets: {
      categories_144307: {
        value: 144307,
        valueUpperBound: 0,
        description: 'Women',
        slug: 'women',
        url: 'women',
        parentId: 'categories_0',
        id: 'categories_144307',
        groupType: 6,
        _isDisabled: false,
        _isActive: false,
        groupsOn: 0,
        count: 13,
      },
      categories_144308: {
        value: 144308,
        valueUpperBound: 0,
        description: 'Women',
        slug: 'women',
        url: 'women',
        parentId: 'categories_0',
        id: 'categories_144308',
        groupType: 6,
        _isDisabled: false,
        _isActive: false,
        groupsOn: 0,
        count: 5,
      },
    },
  },
  result: [mockListingFacetsValueNormalized],
};
