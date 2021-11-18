import { getSEO } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/seo.fixtures';
import moxios from 'moxios';

describe('SEO client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSEO()', () => {
    const spy = jest.spyOn(client, 'get');
    const query = {
      path: 'about',
      pageType: 'pages',
      subpageType: '',
      param: null,
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
      fixtures.success({
        queryParams: query,
        response,
      });

      await expect(getSEO(query)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        '/seo/metadata?pageType=pages&param&path=about&subpageType=',
        expectedConfig,
      );
    });

    it('should handle a client request error', async () => {
      fixtures.failure({
        queryParams: query,
      });

      await expect(getSEO(query)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/seo/metadata?pageType=pages&param&path=about&subpageType=',
        expectedConfig,
      );
    });
  });
});
