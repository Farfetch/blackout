export const mockSeo = {
  title: 'FPS React Head',
  description: 'FPS React Head component',
  keywords: 'ecommerce, Fashion, Luxury, Shopping',
  htmlAttributes: { lang: 'en' },
  metatags: [
    {
      propertyType: 'property',
      propertyDescription: 'og:title',
      content: 'FPS React Head',
    },
    {
      propertyType: 'property',
      propertyDescription: 'og:locale',
      content: 'en_US',
    },
    {
      propertyType: 'name',
      propertyDescription: 'twitter:card',
      content: 'product',
    },
  ],
  canonicalUrl: '/pt',
  hrefLangs: [
    {
      hrefLang: 'en-US',
    },
    {
      href: '/us',
      hrefLang: 'x-default',
    },
    {
      href: '/uk',
      hrefLang: 'en-GB',
    },
  ],
};

export const mockSeoInvalid = {
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
