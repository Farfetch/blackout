export const mockCategoryId = 135967;
export const mockBrandId = 1053;

export const mockCategoriesIds = [mockCategoryId, 135983, 136099];
export const mockBrandsIds = [mockBrandId];

export const mockQuery = {
  brandIds: mockBrandsIds,
  categoryIds: [mockCategoriesIds[0]],
};

export const mockCategories = [
  {
    id: mockCategoryId,
    gender: 0,
    name: 'Clothing',
    parentId: 0,
  },
  {
    id: 135983,
    gender: 0,
    name: 'Tops',
    parentId: mockCategoryId,
  },
  {
    id: 136099,
    gender: 0,
    name: 'Shirts',
    parentId: 135983,
  },
];

export const mockSizeguides = [
  {
    categoryId: mockCategoryId,
    brandId: null,
    maps: [
      {
        sizeScaleId: 115,
        description: 'Clothing standard',
        abbreviation: '',
        maps: [
          {
            description: 'XXXS',
            position: 0,
          },
        ],
      },
      {
        sizeScaleId: 193,
        description: 'Italy',
        abbreviation: 'IT',
        maps: [
          {
            description: 'XXXS',
            position: 0,
          },
        ],
      },
    ],
  },
  {
    categoryId: mockCategoryId,
    brandId: mockBrandId,
    maps: [
      {
        sizeScaleId: 950,
        description: 'CHLOÉ STANDARD',
        abbreviation: '',
        maps: [
          {
            description: 'XXXS',
            position: 0,
          },
        ],
      },
      {
        sizeScaleId: 955,
        description: 'CHLOÉ FRANCE',
        abbreviation: 'FR',
        maps: [
          {
            description: 'XXXS',
            position: 0,
          },
        ],
      },
    ],
  },
  {
    categoryId: 135983,
    brandId: mockBrandId,
    maps: [],
  },
  {
    categoryId: 135983,
    brandId: null,
    maps: [],
  },
];

export const mockState = {
  sizeguides: {
    error: 'Error - Sizeguides request.',
    isLoading: false,
    result: mockSizeguides,
  },
  entities: {
    categories: {
      [mockCategoriesIds[0]]: mockCategories[0],
      [mockCategoriesIds[1]]: mockCategories[1],
      [mockCategoriesIds[2]]: mockCategories[2],
    },
  },
};
