import { type ContentPage, ContentPageType } from '../types/index.js';
import { getContentPage } from '../index.js';
import client from '../../helpers/client/index.js';
import fixture from '../__fixtures__/contentPage.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

describe('getContentPage()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const spy = jest.spyOn(client, 'get');
  const contentType = ContentPageType.Listing;
  const query = {
    slug: '/shopping/test',
  };

  const response: ContentPage = {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
        publicationDate: '2021-10-28T10:34:01.226Z',
        versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
        spaceCode: 'website',
        contentTypeCode: 'listing',
        environmentCode: 'live',
        code: 'test',
        metadata: {
          custom: {
            id: 'qew',
            gender: 'wqe',
            brand: 'e2',
            priceType: 'e2',
            category: 'e2z',
          },
        },
        target: {
          contentzone: '10674',
        },
        components: [
          {
            type: 'html',
            content: '',
            name: 'QA HTML Template',
            displayOptions: {},
          },
        ],
      },
    ],
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixture.get.success(response));

    await expect(getContentPage(contentType, query)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/wl/v1/content/pages/${contentType}?slug=%2Fshopping%2Ftest`,
      expectedConfig,
    );
  });

  it('should handle a client request successfully with target benefits and target segments', async () => {
    mswServer.use(fixture.get.success(response));

    const query = {
      slug: '/shopping/test',
      'target.benefits': 'private-sale,vip',
      'target.segments': '45,full',
    };

    await expect(getContentPage(contentType, query)).resolves.toEqual(response);

    const url = join('/wl/v1/content/pages/', contentType, { query });

    expect(spy).toHaveBeenCalledWith(url, expectedConfig);
  });

  it('should handle a client request error', async () => {
    mswServer.use(fixture.get.failure());

    await expect(getContentPage(contentType, query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/wl/v1/content/pages/${contentType}?slug=%2Fshopping%2Ftest`,
      expectedConfig,
    );
  });
});
