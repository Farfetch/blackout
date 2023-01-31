export const mockScaleId = 117;
export const mockCategoryId = 135968;

export const mockQuery = {
  categoryId: mockCategoryId,
};

export const mockSizeScale = {
  sizeScaleId: mockScaleId,
  description: 'M.FILTER US',
  abbreviation: 'US',
  maps: [
    {
      description: '3',
      position: 17,
    },
    {
      description: '3.5',
      position: 18,
    },
    {
      description: '4',
      position: 19,
    },
    {
      description: '4.5',
      position: 20,
    },
    {
      description: '5',
      position: 21,
    },
  ],
  isDefault: true,
  categoryId: 135968,
};

export const mockState = {
  sizeScales: {
    error: null,
    errorById: {},
    errorByQuery: {},
    isLoading: false,
    isLoadingById: {
      [mockScaleId]: false,
    },
    isLoadingByQuery: {
      [mockCategoryId]: false,
    },
  },
  entities: {
    sizeScales: {
      [mockScaleId]: mockSizeScale,
    },
  },
};
