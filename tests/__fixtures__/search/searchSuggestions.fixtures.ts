export const mockSearchSuggestionsQuery = {
  gender: 0,
  ignoreFilterExclusions: true,
  query: 'dresses',
};

export const mockSearchSuggestionsResponse = [
  {
    gender: 0,
    id: 137441,
    suggestion: 'Dresses',
    type: 1,
    matchesSearch: true,
    typeName: 'Category',
    url: '/en-pt/shopping/women-clothing-dresses',
    numberOfResults: 1810,
  },
  {
    gender: 0,
    id: 137443,
    suggestion: 'Maxi Dresses',
    type: 1,
    matchesSearch: false,
    typeName: 'Category',
    url: '/en-pt/shopping/women-dresses-maxi-dresses',
    numberOfResults: 325,
  },
];

export const mockSearchSuggestionsState = {
  search: {
    suggestions: {
      error: { message: 'Error - Search request.' },
      isLoading: false,
      query: mockSearchSuggestionsQuery,
      result: mockSearchSuggestionsResponse,
    },
  },
};
