export const mockBrandId = 211376;
export const mockBrandId2 = 220127;
export const mockHash = 'brands?id=211376, 220127';

export const mockQuery = {
  id: `${mockBrandId}, ${mockBrandId2}`,
};

export const mockBrandResponse = {
  id: mockBrandId,
  name: 'Derek Lam 10 Crosby',
  description: 'Derek Lam is an American fashion designer.',
};

export const mockBrandsResponse = {
  number: 1,
  totalPages: 1,
  totalItems: 30,
  entries: [
    mockBrandResponse,
    {
      id: mockBrandId2,
      name: 'Cecilia Prado',
      description:
        'Cecilia Prado pushes the boundaries of traditional knitwear.',
    },
  ],
};

export const mockState = {
  brands: {
    hash: mockHash,
    isLoading: {
      [mockBrandId]: false,
      [mockHash]: false,
    },
    error: {},
    result: {
      [mockHash]: {
        ...mockBrandsResponse,
        entries: [mockBrandId, mockBrandId2],
      },
    },
  },
  entities: {
    brands: {
      [mockBrandId]: mockBrandResponse,
      [mockBrandId2]: mockBrandsResponse.entries[1],
    },
  },
};

export const mockInitialState = {
  brands: {
    hash: mockHash,
    isLoading: {
      [mockBrandId]: false,
      [mockHash]: false,
    },
    error: {},
    result: {},
  },
  entities: {
    brands: {},
  },
};

export const mockLoadingState = {
  brands: {
    hash: mockHash,
    isLoading: {
      [mockBrandId]: true,
      [mockHash]: true,
    },
    error: {},
    result: {},
  },
  entities: {
    brands: {},
  },
};

export const mockErrorState = {
  brands: {
    hash: mockHash,
    isLoading: {
      [mockHash]: false,
    },
    error: {
      [mockBrandId]: { message: 'foo' },
      [mockHash]: { message: 'foo' },
    },
    result: {},
  },
  entities: {
    brands: {},
  },
};

export const mockBrandsNormalizedResponse = {
  entities: mockState.entities,
  result: {
    ...mockBrandsResponse,
    entries: [mockBrandId, mockBrandId2],
  },
};
