import { GenderCode } from '@farfetch/blackout-client';

export const mockSearchDidYouMeanHash = 'balenciaga!0,1';

export const mockSearchDidYouMeanQuery = {
  genders: [GenderCode.Woman, GenderCode.Man],
  searchTerms: 'balenciaga',
};

export const mockSearchDidYouMeanResponse = [
  {
    slug: 'balenciaga',
    suggestion: 'Balenciaga',
    type: 2,
    resourceId: 2450,
  },
];

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
  },
};

export const mockSearchDidYouMeanErrorState = {
  search: {
    didYouMean: {
      [mockSearchDidYouMeanHash]: {
        query: mockSearchDidYouMeanQuery,
        error: 'Error - Search did you mean request.',
        isLoading: false,
        result: null,
      },
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
  },
};
