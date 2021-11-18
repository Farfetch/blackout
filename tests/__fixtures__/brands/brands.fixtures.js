const hash = 'brands?id=211376, 110127';

export const mockBrandId = 211376;

export const mockQuery = {
  id: `${mockBrandId}, 110127`,
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
      id: 110127,
      name: 'Cecilia Prado',
      description:
        'Cecilia Prado pushes the boundaries of traditional knitwear.',
    },
  ],
};

export const mockState = {
  brands: {
    hash: hash,
    isLoading: {
      [mockBrandId]: false,
      [hash]: false,
    },
    error: {
      [mockBrandId]: { message: 'bar' },
      [hash]: { message: 'foo' },
    },
    result: {
      [hash]: { ...mockBrandsResponse, entries: [mockBrandId, 110127] },
    },
  },
  entities: {
    brands: {
      [mockBrandId]: mockBrandResponse,
      110127: mockBrandsResponse.entries[1],
    },
  },
};
