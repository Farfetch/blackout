export const mockInitialState = {
  contents: {
    metadata: {
      error: {},
      isLoading: {},
      result: null,
    },
  },
  locale: {
    countryCode: 'GB',
  },
  entities: {
    countries: {
      GB: {
        cultureCode: 'en-GB',
      },
    },
  },
};

export const mockState = {
  contents: {
    metadata: {
      error: {},
      isLoading: {
        'pages!/about': true,
      },
      result: {
        'pages!/about': {
          title: 'Test',
          h1: 'Dummy h1',
          canonicalUrl: 'https://api.blackout.com',
          keywords: 'Dummy keywords',
          description: 'Dummy description',
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

export const mockStateEmptySocialMeta = {
  contents: {
    metadata: {
      error: {},
      isLoading: {
        'pages!/about': true,
      },
      result: {
        'pages!/about': {
          title: 'Test',
          h1: 'Dummy h1',
          canonicalUrl: 'https://api.blackout.com',
          keywords: 'Dummy keywords',
          description: 'Dummy description',
          headPrefix: 'og: http://ogp.me/ns#',
          imageAltText: null,
          metatags: [
            {
              tagName: 'meta',
              contentType: 'content',
              content: 'en_US',
            },
          ],
          hrefLangs: [],
        },
      },
    },
  },
};

export const result = {
  error: undefined,
  isLoading: true,
  meta: {
    title: 'Test',
    description: 'Dummy description',
    canonical: 'https://api.blackout.com',
    meta: [
      {
        content: 'Dummy description',
        name: 'description',
      },
      {
        content: 'Dummy keywords',
        name: 'keywords',
      },
      {
        content: 'en_US',
        property: 'og:locale',
      },
    ],
    link: [
      {
        href: 'https://api.blackout.com',
        rel: 'canonical',
      },
      {
        href: 'https://api.blackout.com',
        hreflang: 'x-default',
        rel: 'alternate',
      },
    ],
  },
};

export const resultNoSocialMeta = {
  error: undefined,
  isLoading: true,
  meta: {
    title: 'Test',
    description: 'Dummy description',
    canonical: 'https://api.blackout.com',
    meta: [
      {
        content: 'Dummy description',
        name: 'description',
      },
      {
        content: 'Dummy keywords',
        name: 'keywords',
      },
      {},
    ],
    link: [
      {
        href: 'https://api.blackout.com',
        rel: 'canonical',
      },
    ],
  },
};

export const query = {
  pageType: 'pages',
  path: '/about',
  subPageType: '',
};
