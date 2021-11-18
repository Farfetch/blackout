export const organization = {
  metadata: {
    metatags: [
      {
        content: 'acme Homepage',
        property: { type: 'property', description: 'homepage:name' },
      },
    ],
  },
  name: 'Organization',
  url: 'http://www.farfetch.com',
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
  '@context': 'http://schema.org/',
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
    '@context': 'http://schema.org/',
    '@type': 'PostalAddress',
    streetAddress: 'Street name',
    addressCountry: 'England',
    addressLocality: 'Street Locality',
    addressRegion: 'Lancashire',
    postalCode: '4000',
  },
  contactPoint: {
    '@context': 'http://schema.org/',
    '@type': 'ContactPoint',
    address: 'Foo',
    telephone: '232323',
    areaServed: 'Europe',
    contactOption: 'foo',
    email: 'foo@gmail.com',
    contactType: 'Customer Service',
  },
};
