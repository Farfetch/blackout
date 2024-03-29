import { mockBuildIconLinksResult } from '../../../utils/__tests__/__fixtures__/metadata.js';
import { SeoPageType, SeoSubPageType } from '@farfetch/blackout-client';

export const mockInitialState = {
  contents: {
    metadata: {
      error: {},
      isLoading: {},
      result: null,
    },
    searchResults: {},
    contentTypes: {
      isLoading: false,
      error: undefined,
    },
  },
  locale: {
    subfolder: 'en-GB',
    countryCode: 'GB',
    sourceCountryCode: 'GB',
    cities: { isLoading: false, error: null },
    countries: { isLoading: false, error: null },
    currencies: { isLoading: false, error: null },
    states: { isLoading: false, error: null },
    countriesAddressSchemas: { isLoading: false, error: null },
  },
  entities: {
    countries: {
      GB: {
        cultureCode: 'en-GB',
        code: '',
        name: '',
        nativeName: '',
        structures: [],
        continentId: 10,
        cultures: [],
        defaultSubfolder: '',
        defaultCulture: '',
      },
    },
  },
};

export const mockState = {
  contents: {
    ...mockInitialState.contents,
    metadata: {
      error: {},
      isLoading: {
        '/about': false,
      },
      result: {
        '/about': {
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
    ...mockInitialState.contents,
    metadata: {
      error: {},
      isLoading: {
        '/about': false,
      },
      result: {
        '/about': {
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
              propertyType: '',
              propertyDescription: '',
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
  isLoading: false,
  isFetched: true,
  data: {
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
      { href: 'https://api.blackout.com', rel: 'canonical' },
      {
        rel: 'alternate',
        href: 'https://api.blackout.com',
        hreflang: 'x-default',
      },
      ...mockBuildIconLinksResult,
    ],
    seo: {
      canonicalUrl: 'https://api.blackout.com',
      description: 'Dummy description',
      h1: 'Dummy h1',
      headPrefix: 'og: http://ogp.me/ns#',
      hrefLangs: [
        {
          href: 'https://api.blackout.com',
          hrefLang: 'x-default',
        },
      ],
      imageAltText: null,
      keywords: 'Dummy keywords',
      metatags: [
        {
          content: 'en_US',
          contentType: 'content',
          propertyDescription: 'og:locale',
          propertyType: 'property',
          tagName: 'meta',
        },
      ],
      title: 'Test',
    },
  },
  actions: {
    fetch: expect.any(Function),
  },
};

export const resultNoSocialMeta = {
  error: undefined,
  isLoading: false,
  isFetched: true,
  data: {
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
      ...mockBuildIconLinksResult,
    ],
    seo: {
      canonicalUrl: 'https://api.blackout.com',
      description: 'Dummy description',
      h1: 'Dummy h1',
      headPrefix: 'og: http://ogp.me/ns#',
      hrefLangs: [],
      imageAltText: null,
      keywords: 'Dummy keywords',
      metatags: [
        {
          content: 'en_US',
          contentType: 'content',
          tagName: 'meta',
          propertyDescription: '',
          propertyType: '',
        },
      ],
      title: 'Test',
    },
  },
  actions: {
    fetch: expect.any(Function),
  },
};

export const query = {
  baseUrl: '',
  pageType: SeoPageType.Pages,
  path: '/about',
  subPageType: SeoSubPageType.Default,
};
