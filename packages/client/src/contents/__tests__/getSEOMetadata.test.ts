import { getSEOMetadata, SeoPageType } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/seo.fixtures';
import mswServer from '../../../tests/mswServer';

describe('SEO client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSEOMetadata()', () => {
    const spy = jest.spyOn(client, 'get');
    const query = {
      path: 'about',
      pageType: SeoPageType.Pages,
      subPageType: '',
      param: {
        subParam: 'mockValue',
      },
    };
    const response = {
      title: null,
      h1: null,
      canonicalUrl: 'https://api.blackout.com/about',
      keywords: null,
      description: null,
      headPrefix: 'og: http://ogp.me/ns#',
      imageAltText: null,
      metatags: [
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
          propertyDescription: 'og:type',
          contentType: 'content',
          content: 'article',
        },
        {
          tagName: 'meta',
          propertyType: 'property',
          propertyDescription: 'og:url',
          contentType: 'content',
          content: 'https://api.blackout.com/about',
        },
        {
          tagName: 'meta',
          propertyType: 'name',
          propertyDescription: 'twitter:card',
          contentType: 'content',
          content: 'summary',
        },
      ],
      hrefLangs: [
        {
          href: 'https://api.blackout.com/about',
          hrefLang: 'x-default',
        },
      ],
    };

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.get.success(response));

      expect.assertions(2);

      await expect(getSEOMetadata(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/seometadata?pageType=5&param.subParam=mockValue&path=about&subPageType=',
        expectedConfig,
      );
    });

    it('should handle a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      expect.assertions(2);

      await expect(getSEOMetadata(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/seometadata?pageType=5&param.subParam=mockValue&path=about&subPageType=',
        expectedConfig,
      );
    });
  });
});