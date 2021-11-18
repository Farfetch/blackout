import * as helpers from '../';
import organizationResult from '../__fixtures__/organizationResult.fixtures.json';

const metadata = {
  metatags: [
    {
      content: 'acme Homepage',
      property: { type: 'property', description: 'organization:name' },
    },
  ],
};
const name = 'Organization';
const url = 'http://www.farfetch.com';
const logoUrl = 'http://www.farfetch.com/static/logo.jpg';
const address = {
  street: 'Street name',
  locality: 'Street Locality',
  region: 'Lancashire',
  postalCode: '4000',
  country: 'England',
};
const contact = {
  phone: '232323',
  type: 'Customer Service',
  address: 'Foo',
  email: 'foo@gmail.com',
  option: 'foo',
  areaServed: 'Europe',
};
const sameAs = [
  'https://www.instagram.com/WL/',
  'https://www.facebook.com/WL/',
  'https://twitter.com/WL',
  'https://www.weibo.com/WL',
];

describe('generateOrganization', () => {
  it('should correctly generate JSON-LD for a Organization', () => {
    const organization = helpers.generateOrganization(
      metadata,
      name,
      url,
      logoUrl,
      address,
      contact,
      sameAs,
    );

    expect(organization).toMatchObject(organizationResult);
  });
});
