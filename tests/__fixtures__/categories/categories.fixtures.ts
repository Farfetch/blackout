export const mockCategoryId = 135981;
export const mockCategory = {
  id: 135981,
  name: 'Trousers',
  parentId: 135967,
  gender: 'Woman',
};

export const mockTopCategories = [
  {
    id: 135973,
    name: 'Accessories',
    gender: 'Woman',
  },
  {
    id: 135967,
    name: 'Clothing',
    gender: 'Woman',
  },
  {
    id: 136330,
    name: 'Clothing',
    gender: 'Man',
  },
];

export const mockChildrenCategories = [
  mockCategory,
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

export const mockCategoriesInitialState = {
  categories: {
    error: null,
    isFetched: false,
    isLoading: false,
    top: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  entities: {
    categories: null,
  },
};

export const mockCategoriesState = {
  categories: {
    error: null,
    isFetched: true,
    isLoading: false,
    top: {
      error: null,
      isLoading: false,
      result: mockTopCategories.map(({ id }) => id),
    },
  },
  entities: {
    categories: mockCategories.reduce((entity, category) => {
      entity[category.id] = category;
      return entity;
    }, {}),
  },
};

export const mockCategoriesLoadingState = {
  categories: {
    error: null,
    isFetched: false,
    isLoading: true,
    top: {
      error: null,
      isLoading: true,
      result: null,
    },
  },
  entities: {
    categories: null,
  },
};

export const mockTopCategoriesLoadingState = {
  categories: {
    error: null,
    isFetched: false,
    isLoading: false,
    top: {
      error: null,
      isLoading: true,
      result: null,
    },
  },
  entities: {
    categories: null,
  },
};

export const mockNormalizedResponse = {
  entities: mockCategoriesState.entities,
  result: mockCategories.map(({ id }) => id),
};

export const normalizedTopResponse = {
  entities: {
    categories: mockTopCategories.reduce((entity, category) => {
      entity[category.id] = category;

      return entity;
    }, {}),
  },
  result: mockTopCategories.map(({ id }) => id),
};

export const mockCategoriesErrorState = {
  categories: {
    error: {
      message: 'An awesome, fascinating and incredible error',
    },
    isLoading: false,
    top: {},
  },
};

export const mockTopCategoriesErrorState = {
  categories: {
    error: null,
    isLoading: false,
    top: {
      error: {
        message: 'An awesome, fascinating and incredible error',
      },
      isLoading: false,
    },
  },
};
