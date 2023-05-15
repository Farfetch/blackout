import { generateSEOPathname } from '@farfetch/blackout-redux';
import { SeoPageType } from '@farfetch/blackout-client';

export const seoQuery = {
  baseUrl: '',
  path: '/about',
  pageType: SeoPageType.Pages,
  subPageType: '',
};

export const pathname = generateSEOPathname(seoQuery);

export const seoData = {
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
};

export const seoResponse = {
  [pathname]: seoData,
};

export const seoInvalidData = {
  title: undefined,
  description: undefined,
  keywords: 'ecommerce, Fashion, Luxury, Shopping',
  canonicalUrl: undefined,
  metatags: [
    {
      other: {
        description: 'og:title',
        type: 'property',
      },
      content: 'FPS React Head',
    },
  ],
};
