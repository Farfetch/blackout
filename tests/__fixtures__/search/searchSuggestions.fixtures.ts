export const mockSearchSuggestionsHash = 'dresses!0!true';

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

export const mockSearchSuggestionsInitialState = {
  search: {
    suggestions: {
      [mockSearchSuggestionsHash]: {
        error: null,
        isLoading: false,
        query: null,
        result: null,
      },
    },
  },
};

export const mockSearchSuggestionsState = {
  search: {
    suggestions: {
      [mockSearchSuggestionsHash]: {
        error: null,
        isLoading: false,
        query: mockSearchSuggestionsQuery,
        result: mockSearchSuggestionsResponse,
      },
    },
  },
};

export const mockSearchSuggestionsLoadingState = {
  search: {
    suggestions: {
      [mockSearchSuggestionsHash]: {
        error: null,
        isLoading: true,
        query: mockSearchSuggestionsQuery,
        result: null,
      },
    },
  },
};

export const mockSearchSuggestionsErrorState = {
  search: {
    suggestions: {
      [mockSearchSuggestionsHash]: {
        error: { message: 'Error - Search request.' },
        isLoading: false,
        query: mockSearchSuggestionsQuery,
        result: null,
      },
    },
  },
};
