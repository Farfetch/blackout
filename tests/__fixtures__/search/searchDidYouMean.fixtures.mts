import {
  GenderCode,
  SearchSuggestionType,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
} from 'tests/__fixtures__/search/index.mjs';

export const mockSearchDidYouMeanHash = 'balenciaga!0,1';

export const mockSearchDidYouMeanQuery = {
  genders: [GenderCode.Woman, GenderCode.Man],
  searchTerms: 'balenciaga',
};

export const mockSearchDidYouMeanResponse = [
  {
    slug: 'balenciaga',
    suggestion: 'Balenciaga',
    type: SearchSuggestionType.Brand,
    resourceId: 2450,
  },
];

export const mockIntents = {
  error: null,
  isLoading: false,
  result: mockSearchIntentsResponse,
  query: mockSearchIntentsQuery,
};

export const mockSuggestions = {
  error: null,
  isLoading: false,
  query: mockSearchSuggestionsQuery,
  result: mockSearchSuggestionsResponse,
};

export const mockSearchDidYouMeanInitialState = {
  search: {
    didYouMean: {
      [mockSearchDidYouMeanHash]: {
        query: null,
        error: null,
        isLoading: false,
        result: null,
      },
    },
    intents: {
      [mockSearchDidYouMeanHash]: mockIntents,
    },
    suggestions: {
      [mockSearchDidYouMeanHash]: mockSuggestions,
    },
  },
};

export const mockSearchDidYouMeanState = {
  search: {
    didYouMean: {
      [mockSearchDidYouMeanHash]: {
        query: mockSearchDidYouMeanQuery,
        error: null,
        isLoading: false,
        result: mockSearchDidYouMeanResponse,
      },
    },
    intents: {
      ...mockSearchDidYouMeanInitialState.search.intents,
    },
    suggestions: {
      ...mockSearchDidYouMeanInitialState.search.suggestions,
    },
  },
};

export const mockSearchDidYouMeanErrorState = {
  search: {
    didYouMean: {
      [mockSearchDidYouMeanHash]: {
        query: mockSearchDidYouMeanQuery,
        error: toBlackoutError(
          new Error('Error - Search did you mean request.'),
        ),
        isLoading: false,
        result: null,
      },
    },
    intents: {
      ...mockSearchDidYouMeanInitialState.search.intents,
    },
    suggestions: {
      ...mockSearchDidYouMeanInitialState.search.suggestions,
    },
  },
};

export const mockSearchDidYouMeanLoadingState = {
  search: {
    didYouMean: {
      [mockSearchDidYouMeanHash]: {
        query: mockSearchDidYouMeanQuery,
        error: null,
        isLoading: true,
        result: null,
      },
    },
    intents: {
      ...mockSearchDidYouMeanInitialState.search.intents,
    },
    suggestions: {
      ...mockSearchDidYouMeanInitialState.search.suggestions,
    },
  },
};
