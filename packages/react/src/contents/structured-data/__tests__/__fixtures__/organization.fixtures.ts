export const organization = {
  metadata: {
    metatags: [
      {
        content: 'Acme Homepage',
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
