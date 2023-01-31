import { buildSEOPathname } from '@farfetch/blackout-core/contents/utils';

export const seoQuery = {
  path: 'about',
  pageType: 'pages',
  subPageType: '',
};

export const pathname = buildSEOPathname(seoQuery);

export const mockResponse = {
  [pathname]: {
    title: 'About',
    h1: 'h1 title',
    canonicalUrl: 'https://api.blackout.com/about',
    keywords: 'test',
    description: 'About Page',
    headPrefix: 'og: http://ogp.me/ns#',
    imageAltText: null,
    metatags: [
      {
        tagName: 'meta',
        propertyType: 'property',
        propertyDescription: 'og:description',
        contentType: 'content',
        content: 'About Page',
      },
    ],
    hrefLangs: [
      {
        href: 'https://api.blackout.com/about',
        hrefLang: 'x-default',
      },
    ],
  },
};
