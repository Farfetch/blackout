export const websiteSearch = {
  metadata: {
    metatags: [
      {
        content: 'Search acme Website',
        property: {
          type: 'property',
          description: 'homepage:searchTitle',
        },
      },
    ],
  },
  url: 'http://www.farfetch.com',
  searchTitle: 'Title',
  urlTemplate: 'http://www.farfetch.com/shopping?query=',
};

export const websiteSearchResult = {
  '@context': 'http://schema.org/',
  '@type': 'WebSite',
  url: 'http://www.farfetch.com',
  potentialAction: {
    '@type': 'SearchAction',
    name: 'Search acme Website',
    target: 'http://www.farfetch.com/shopping?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};
