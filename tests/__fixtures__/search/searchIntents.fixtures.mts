import {
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
  mockSuggestions,
} from 'tests/__fixtures__/search/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';

export const mockSearchIntentsHash = 'white dresses!0';

export const mockSearchIntentsRedirectUrl = 'mockRedirectUrl';

export const mockSearchIntentsQuery = {
  searchTerms: 'white dresses',
  gender: 0,
};

export const mockDidYouMean = {
  query: mockSearchDidYouMeanQuery,
  error: null,
  isLoading: false,
  result: mockSearchDidYouMeanResponse,
};

export const mockSearchIntentsResponse = {
  typeRequest: 0,
  redirectUrl: '/pt/shopping/woman?query=white+dresses',
  resources: [
    {
      typeFilter: 0,
      values: [
        {
          value: '123456',
          slug: 'white-dresses',
        },
      ],
    },
  ],
};

export const mockSearchIntentsResponseRedirect = {
  typeRequest: 2,
  redirectUrl: mockSearchIntentsRedirectUrl,
  resources: [],
};

export const mockSearchIntentsResponseProduct = {
  typeRequest: 1,
  redirectUrl: '',
  resources: [
    {
      values: [{ value: 'dress', slug: 'beautiful-dress' }],
      typeFilter: 10,
    },
  ],
};

export const mockSearchIntentsResponseListing = {
  typeRequest: 0,
  redirectUrl: '',
  resources: [
    {
      values: [{ value: 'woman', slug: '' }],
      typeFilter: 3,
    },
    {
      values: [{ value: 'pink', slug: '' }],
      typeFilter: 8,
    },
  ],
};

export const mockSearchIntentsResponseListingWithParameters = {
  typeRequest: 0,
  redirectUrl: '',
  resources: [
    { values: [{ value: '10533', slug: 'valentino' }], typeFilter: 1 },
    {
      values: [
        { value: '137520', slug: 'women-shoes' },
        { value: '137641', slug: 'men-shoes' },
      ],
      typeFilter: 2,
    },
    {
      values: [{ value: 'akdksaldkasld', slug: '' }],
      typeFilter: 10,
    },
  ],
};

export const mockSearchIntentsResponseListingWithParameterAndUnescapedCharacters =
  {
    typeRequest: 0,
    redirectUrl: '',
    resources: [
      { values: [{ value: '10533', slug: 'valentino' }], typeFilter: 1 },
      {
        values: [
          { value: '137520', slug: 'women-shoes' },
          { value: '137641', slug: 'men-shoes' },
        ],
        typeFilter: 2,
      },
      {
        values: [{ value: 'Shoes & Stuff', slug: '' }],
        typeFilter: 10,
      },
    ],
  };

export const mockSearchIntentsInvalidResponse = {
  typeRequest: 9999,
  redirectUrl: '',
  resources: [],
};

export const mockSearchIntentsInitialState = {
  search: {
    intents: {
      [mockSearchIntentsHash]: {
        error: null,
        isLoading: false,
        result: null,
        query: { searchTerms: 'balenciaga' },
      },
    },
    didYouMean: {
      [mockSearchIntentsHash]: mockDidYouMean,
    },
    suggestions: {
      [mockSearchIntentsHash]: mockSuggestions,
    },
  },
};

export const mockSearchIntentsState = {
  search: {
    intents: {
      [mockSearchIntentsHash]: {
        error: null,
        isLoading: false,
        result: mockSearchIntentsResponse,
        query: mockSearchIntentsQuery,
      },
    },
    didYouMean: {
      [mockSearchIntentsHash]: mockDidYouMean,
    },
    suggestions: {
      [mockSearchIntentsHash]: mockSuggestions,
    },
  },
};

export const mockSearchIntentsLoadingState = {
  search: {
    intents: {
      [mockSearchIntentsHash]: {
        error: null,
        isLoading: true,
        result: null,
        query: mockSearchIntentsQuery,
      },
    },
    didYouMean: {
      [mockSearchIntentsHash]: mockDidYouMean,
    },
    suggestions: {
      [mockSearchIntentsHash]: mockSuggestions,
    },
  },
};

export const mockSearchIntentsErrorState = {
  search: {
    intents: {
      [mockSearchIntentsHash]: {
        error: toBlackoutError(
          new Error('An awesome, fascinating and incredible error'),
        ),
        isLoading: false,
        result: null,
        query: mockSearchIntentsQuery,
      },
    },
    didYouMean: {
      [mockSearchIntentsHash]: mockDidYouMean,
    },
    suggestions: {
      [mockSearchIntentsHash]: mockSuggestions,
    },
  },
};
