export const mockCategoryId = 135967;

export const mockCategory = {
  id: mockCategoryId,
  name: 'Clothing',
  gender: 'Woman',
};

export const mockTopCategories = [
  mockCategory,
  {
    id: 135973,
    name: 'Accessories',
    gender: 'Woman',
  },
  {
    id: 136330,
    name: 'Clothing',
    gender: 'Man',
  },
];

export const mockChildrenCategories = [
  {
    id: 135981,
    name: 'Trousers',
    parentId: mockCategoryId,
    gender: 'Woman',
  },
  {
    id: 136338,
    name: 'Trousers',
    parentId: 136330,
    gender: 'Man',
  },
  {
    id: 136337,
    name: 'Denim',
    parentId: 136330,
    gender: 'Man',
  },
];

export const mockCategories = [...mockTopCategories, ...mockChildrenCategories];

export const mockState = {
  categories: {
    isLoading: false,
    error: { message: 'foo' },
    top: mockTopCategories.map(({ id }) => id),
    areCategoriesFetched: true,
    areTopCategoriesFetched: true,
  },
  entities: {
    categories: mockCategories.reduce((entity, category) => {
      entity[category.id] = category;
      return entity;
    }, {}),
  },
};

export const mockLoadingState = {
  categories: {
    isLoading: true,
    error: null,
    top: null,
    areCategoriesFetched: false,
    areTopCategoriesFetched: false,
  },
  entities: {},
};

export const mockUnfetchedState = {
  categories: {
    isLoading: false,
    error: null,
    top: null,
    areCategoriesFetched: false,
    areTopCategoriesFetched: false,
  },
  entities: {},
};
