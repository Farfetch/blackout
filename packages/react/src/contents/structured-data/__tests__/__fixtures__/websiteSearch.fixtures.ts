export const websiteSearch = {
  metadata: {
    metatags: [],
  },
  url: 'http://www.farfetch.com',
  searchTitle: 'Title',
  urlTemplate: 'http://www.farfetch.com/shopping',
};

export const websiteSearchResult = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'http://www.farfetch.com',
  potentialAction: {
    '@type': 'SearchAction',
    name: 'Title',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'http://www.farfetch.com/shopping{search_term_string}',
    },
    'query-input': {
      '@type': 'PropertyValueSpecification',
      valueRequired: 'True',
      valueName: 'search_term_string',
    },
  },
};
