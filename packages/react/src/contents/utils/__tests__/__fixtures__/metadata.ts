export const mockSeo = {
  title: 'Mock Title',
  h1: null,
  canonicalUrl: 'https://mockurl.com',
  keywords: 'Mock Keyword 1 , Mock Keyword 2 , Mock Keyword 3 ',
  description: 'A Mock Description',
  headPrefix: 'og: http://ogp.me/ns# product: http://ogp.me/ns/product#',
  imageAltText: null,
  metatags: [
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'og:description',
      contentType: 'content',
      content: 'Mock description',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'og:image',
      contentType: 'content',
      content: 'https://mockimage.jpg',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'og:locale',
      contentType: 'content',
      content: 'en_US',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'og:title',
      contentType: 'content',
      content: 'Mock title',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'og:type',
      contentType: 'content',
      content: 'product',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'og:url',
      contentType: 'content',
      content: 'https://mockurl.com',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'product:availability',
      contentType: 'content',
      content: 'mock in stock',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'product:brand',
      contentType: 'content',
      content: 'mock brand',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'product:category',
      contentType: 'content',
      content: 'mock category',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'product:color',
      contentType: 'content',
      content: 'mock color',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'product:condition',
      contentType: 'content',
      content: 'mock condition',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'product:price:amount',
      contentType: 'content',
      content: 'mock amount',
    },
    {
      tagName: 'meta',
      propertyType: 'property',
      propertyDescription: 'product:price:currency',
      contentType: 'content',
      content: 'mock currency',
    },
    {
      tagName: 'meta',
      propertyType: 'name',
      propertyDescription: 'twitter:card',
      contentType: 'content',
      content: 'mock summary',
    },
    {
      tagName: 'meta',
      propertyType: 'name',
      propertyDescription: 'twitter:description',
      contentType: 'content',
      content: 'mock twitter description',
    },
    {
      tagName: 'meta',
      propertyType: 'name',
      propertyDescription: 'twitter:image',
      contentType: 'content',
      content: 'https://mocktwitterimage.jpg',
    },
    {
      tagName: 'meta',
      propertyType: 'name',
      propertyDescription: 'twitter:image:alt',
      contentType: 'content',
      content: 'Mock twitter alt text',
    },
    {
      tagName: 'meta',
      propertyType: 'name',
      propertyDescription: 'twitter:title',
      contentType: 'content',
      content: 'Mock twitter title',
    },
  ],
};

export const mockedBuildMetasResult = [
  { content: 'A Mock Description', name: 'description' },
  {
    content: 'Mock Keyword 1 , Mock Keyword 2 , Mock Keyword 3 ',
    name: 'keywords',
  },
  { content: 'Mock description', property: 'og:description' },
  { content: 'https://mockimage.jpg', property: 'og:image' },
  { content: 'en_US', property: 'og:locale' },
  { content: 'Mock title', property: 'og:title' },
  { content: 'product', property: 'og:type' },
  { content: 'https://mockurl.com', property: 'og:url' },
  { content: 'mock in stock', property: 'product:availability' },
  { content: 'mock brand', property: 'product:brand' },
  {
    content: 'mock category',
    property: 'product:category',
  },
  {
    content: 'mock color',
    property: 'product:color',
  },
  {
    content: 'mock condition',
    property: 'product:condition',
  },
  {
    content: 'mock amount',
    property: 'product:price:amount',
  },
  {
    content: 'mock currency',
    property: 'product:price:currency',
  },
  {
    content: 'mock summary',
    name: 'twitter:card',
  },
  {
    content: 'mock twitter description',
    name: 'twitter:description',
  },
  {
    content: 'https://mocktwitterimage.jpg',
    name: 'twitter:image',
  },
  {
    content: 'Mock twitter alt text',
    name: 'twitter:image:alt',
  },
  {
    content: 'Mock twitter title',
    name: 'twitter:title',
  },
];

export const mockDefaultAppLinks = {
  appleIcons: [
    {
      href: 'shared/media/favicon/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
  icons: [
    {
      href: 'shared/media/favicon/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      href: 'shared/media/favicon/favicon-32x32.png',
      sizes: '32x32',
    },
  ],
  maskIcon: {
    color: '#5bbad5',
    href: 'shared/media/favicon/safari-pinned-tab.svg',
  },
};

export const mockBuildIconLinksResult = [
  {
    href: 'shared/media/favicon/favicon-16x16.png',
    rel: 'icon',
    sizes: '16x16',
    type: 'image/png',
  },
  {
    href: 'shared/media/favicon/favicon-32x32.png',
    rel: 'icon',
    sizes: '32x32',
    type: 'image/png',
  },
  {
    href: 'shared/media/favicon/apple-touch-icon.png',
    rel: 'apple-touch-icon',
    sizes: '180x180',
  },
  {
    color: '#5bbad5',
    href: 'shared/media/favicon/safari-pinned-tab.svg',
    rel: 'mask-icon',
  },
];

export const mockBuildLinksResult = [
  { href: 'https://mockurl.com', rel: 'canonical' },
  { href: 'https://mockUrl.com', hreflang: 'mockHrefLang', rel: 'mockRel' },
  {
    href: 'shared/media/favicon/favicon-16x16.png',
    rel: 'icon',
    sizes: '16x16',
    type: 'image/png',
  },
  {
    href: 'shared/media/favicon/favicon-32x32.png',
    rel: 'icon',
    sizes: '32x32',
    type: 'image/png',
  },
  {
    href: 'shared/media/favicon/apple-touch-icon.png',
    rel: 'apple-touch-icon',
    sizes: '180x180',
  },
  {
    color: '#5bbad5',
    href: 'shared/media/favicon/safari-pinned-tab.svg',
    rel: 'mask-icon',
  },
];
