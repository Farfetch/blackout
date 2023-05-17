import { GenderCode, toBlackoutError } from '@farfetch/blackout-client';
import { mockDidYouMean, mockIntents } from 'tests/__fixtures__/search/index.mjs';

export const mockSearchSuggestionsHash = 'dresses!0!true';

export const mockSearchSuggestionsQuery = {
  gender: GenderCode.Woman,
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
    didYouMean: {
      [mockSearchSuggestionsHash]: mockDidYouMean,
    },
    intents: {
      [mockSearchSuggestionsHash]: mockIntents,
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
    intents: {
      ...mockSearchSuggestionsInitialState.search.intents,
    },
    didYouMean: {
      ...mockSearchSuggestionsInitialState.search.didYouMean,
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
    intents: {
      ...mockSearchSuggestionsInitialState.search.intents,
    },
    didYouMean: {
      ...mockSearchSuggestionsInitialState.search.didYouMean,
    },
  },
};

export const mockSearchSuggestionsErrorState = {
  search: {
    suggestions: {
      [mockSearchSuggestionsHash]: {
        error: toBlackoutError(new Error('Error - Search request.')),
        isLoading: false,
        query: mockSearchSuggestionsQuery,
        result: null,
      },
    },
    intents: {
      ...mockSearchSuggestionsInitialState.search.intents,
    },
    didYouMean: {
      ...mockSearchSuggestionsInitialState.search.didYouMean,
    },
  },
};
