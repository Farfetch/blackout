import { getContentPages } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/contentPages.fixtures';
import moxios from 'moxios';

describe('getContentPages()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const spy = jest.spyOn(client, 'get');
  const contentType = 'LISTING';
  const query = {
    slug: '/shopping/test',
  };

  const response = {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
        versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
        spaceCode: 'website',
        contentTypeCode: 'listing',
        environmentCode: 'live',
        code: 'test',
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
    fixture.success({ contentType, queryParams: query, response });

    expect.assertions(2);

    await expect(getContentPages(contentType, query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/wl/v1/content/pages/${contentType}?slug=%2Fshopping%2Ftest`,
      expectedConfig,
    );
  });

  it('should handle a client request error', async () => {
    fixture.failure({ contentType, queryParams: query });

    expect.assertions(2);

    await expect(getContentPages(contentType, query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/wl/v1/content/pages/${contentType}?slug=%2Fshopping%2Ftest`,
      expectedConfig,
    );
  });
});
