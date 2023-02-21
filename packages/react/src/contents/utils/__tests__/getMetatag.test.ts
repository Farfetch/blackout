import * as utils from '..';

const metadata = {
  metatags: [
    {
      content: 'PRODUCT TEST AUTOMATIC description',
      propertyType: 'property',
      propertyDescription: 'og:description',
    },
  ],
};

describe('getMetatag', () => {
  it('should correctly return a specific metatag text if exists', () => {
    const metatag = utils.getMetatag('og:description', metadata.metatags);
    const metatagResult = 'PRODUCT TEST AUTOMATIC description';

    expect(metatag).toBe(metatagResult);
  });

  it('should return undefined if a specific metatag text if doesn`t exist', () => {
    const metatag = utils.getMetatag('og:title', metadata.metatags);

    expect(metatag).toBeUndefined();
  });
});
