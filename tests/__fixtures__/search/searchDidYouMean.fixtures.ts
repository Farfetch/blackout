export const mockSearchDidYouMeanQuery = {
  genders: ['0', '1'],
  searchTerms: 'balenciga',
};

export const mockSearchDidYouMeanResponse = [
  {
    slug: 'balenciaga',
    suggestion: 'Balenciaga',
    type: 2,
    resourceId: 2450,
  },
];

export const mockSearchDidYouMeanState = {
  search: {
    didYouMean: {
      query: mockSearchDidYouMeanQuery,
      error: 'Error - Search did you mean request.',
      isLoading: false,
      result: mockSearchDidYouMeanResponse,
    },
  },
};
