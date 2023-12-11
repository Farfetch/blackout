export const organization = {
  metadata: {
    metatags: [
      {
        content: 'Acme Homepage',
        property: { type: 'property', description: 'homepage:name' },
        tagName: '',
        propertyType: '',
        propertyDescription: '',
        contentType: '',
      },
    ],
    title: '',
    h1: '',
    canonicalUrl: '',
    keywords: '',
    description: '',
    headPrefix: '',
  },
  name: 'Organization',
  legalName: 'Organization legal',
  url: 'http://www.farfetch.com',
  description: 'Description',
  urlTemplate: 'http://www.farfetch.com/shopping',
  searchTitle: 'Search Title',
  logoUrl: 'http://www.farfetch.com/static/logo.jpg',
  address: {
    street: 'Street name',
    locality: 'Street Locality',
    region: 'Lancashire',
    postalCode: '4000',
    country: 'England',
  },
  contact: {
    phone: '232323',
    type: 'Customer Service',
    address: 'Foo',
    email: 'foo@gmail.com',
    option: 'foo',
    areaServed: 'Europe',
  },
  sameAs: [
    'https://www.instagram.com/WL/',
    'https://www.facebook.com/WL/',
    'https://twitter.com/WL',
    'https://www.weibo.com/WL',
  ],
};

export const organizationResult = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Organization',
  url: 'http://www.farfetch.com',
  logo: 'http://www.farfetch.com/static/logo.jpg',
  sameAs: [
    'https://www.instagram.com/WL/',
    'https://www.facebook.com/WL/',
    'https://twitter.com/WL',
    'https://www.weibo.com/WL',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Street name',
    addressLocality: 'Street Locality',
    addressRegion: 'Lancashire',
    postalCode: '4000',
    addressCountry: 'England',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '232323',
    contactType: 'Customer Service',
    email: 'foo@gmail.com',
    contactOption: 'foo',
    areaServed: 'Europe',
  },
};

export const organizationResultWithLegalNameDescription = {
  ...organizationResult,
  legalName: 'Organization legal',
  description: 'Description',
};

export const organizationResultWithPotentialAction = {
  ...organizationResult,
  potentialAction: {
    '@type': 'SearchAction',
    name: 'Search Title',
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
