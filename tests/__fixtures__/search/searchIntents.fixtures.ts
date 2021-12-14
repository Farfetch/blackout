export const mockSearchIntentsRedirectUrl = 'mockRedirectUrl';

export const mockSearchIntentsQuery = {
  searchTerms: 'white dresses',
  gender: 0,
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
  redirectUrl: null,
  resources: [
    {
      values: [{ value: 'dress', slug: 'beautiful-dress' }],
      typeFilter: 10,
    },
  ],
};

export const mockSearchIntentsResponseListing = {
  typeRequest: 0,
  redirectUrl: null,
  resources: [
    {
      values: [{ value: 'woman', slug: null }],
      typeFilter: 3,
    },
    {
      values: [{ value: 'pink', slug: null }],
      typeFilter: 8,
    },
  ],
};

export const mockSearchIntentsResponseListingWithParameters = {
  typeRequest: 0,
  redirectUrl: null,
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
      values: [{ value: 'akdksaldkasld', slug: null }],
      typeFilter: 10,
    },
  ],
};

export const mockSearchIntentsInvalidResponse = {
  typeRequest: 9999,
  redirectUrl: null,
  resources: [],
};

export const mockSearchIntentsInitialState = {
  search: {
    intents: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
};

export const mockSearchIntentsState = {
  search: {
    intents: {
      error: null,
      isLoading: false,
      result: mockSearchIntentsResponse,
    },
  },
};

export const mockSearchIntentsLoadingState = {
  search: {
    intents: {
      error: null,
      isLoading: true,
      result: null,
    },
  },
};

export const mockSearchIntentsErrorState = {
  search: {
    intents: {
      error: { message: 'An awesome, fascinating and incredible error' },
      isLoading: false,
      result: null,
    },
  },
};
