import generateSchemaOrgProperty from '../generateSchemaOrgProperty.js';

const metadata = {
  title: 'Title',
  h1: 'H1',
  canonicalUrl: 'Canonical Url',
  keywords: 'Keywords',
  description: 'Description',
  headPrefix: 'Head Prefix',
  metatags: [
    {
      tagName: 'Tag mame',
      propertyType: 'property',
      propertyDescription: 'Description',
      contentType: 'Content Type',
      content: 'Content',
    },
  ],
};

describe('generateSchemaOrgProperty', () => {
  it('should return a string with categories divided by commas', () => {
    const categories = generateSchemaOrgProperty('Description', metadata);
    const result = 'Content';

    expect(categories).toBe(result);
  });
});
