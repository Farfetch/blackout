export const mockInitialState = {
  contents: {
    metadata: {
      error: {},
      isLoading: {},
      result: null,
    },
  },
};

export const mockState = {
  contents: {
    metadata: {
      error: {},
      isLoading: {
        'pages|/': true,
      },
      result: {
        'pages|/': {
          title: 'Test',
          h1: null,
          canonicalUrl: 'https://api.blackout.com',
          keywords: null,
          description: null,
          headPrefix: 'og: http://ogp.me/ns#',
          imageAltText: null,
          metatags: [
            {
              tagName: 'meta',
              propertyType: 'property',
              propertyDescription: 'og:locale',
              contentType: 'content',
              content: 'en_US',
            },
          ],
          hrefLangs: [
            {
              href: 'https://api.blackout.com',
              hrefLang: 'x-default',
            },
          ],
        },
      },
    },
  },
};

export const query = {
  pageType: 'pages',
  path: '/',
  subPageType: '',
};
